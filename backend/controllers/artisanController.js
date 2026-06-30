const { Artisan, Specialite, Categorie } = require('../models');
const { Op, Sequelize } = require('sequelize');

// =============================================
// 1. RÉCUPÉRATION AVEC FILTRES COMPLETS
// =============================================
exports.getAllArtisans = async (req, res, next) => {
    try {
        const { 
            categorie, 
            specialite, 
            search, 
            top, 
            minNote,
            maxNote,
            ville,
            limit = 50,
            offset = 0,
            sortBy = 'note',
            sortOrder = 'DESC'
        } = req.query;

        const where = {};
        const includeOptions = {
            model: Specialite,
            as: 'specialite'
        };

        // Filtre par recherche (nom, description)
        if (search && search.trim().length >= 2) {
            where[Op.or] = [
                { nom: { [Op.like]: `%${search}%` } },
                { a_propos: { [Op.like]: `%${search}%` } },
                { localisation: { [Op.like]: `%${search}%` } }
            ];
        }

        // Filtre par note minimale
        if (minNote) {
            where.note = { [Op.gte]: parseFloat(minNote) };
        }

        // Filtre par note maximale
        if (maxNote) {
            where.note = { ...where.note, [Op.lte]: parseFloat(maxNote) };
        }

        // Filtre par ville
        if (ville) {
            where.localisation = { [Op.like]: `%${ville}%` };
        }

        // Filtre par catégorie
        if (categorie) {
            includeOptions.include = [{
                model: Categorie,
                as: 'categorie',
                where: { nom: categorie }
            }];
        }

        // Filtre par spécialité
        if (specialite) {
            includeOptions.where = { nom: specialite };
        }

        // Filtre Top artisans
        if (top === 'true') {
            where.is_top = true;
        }

        // Tri
        const order = [];
        if (sortBy === 'note') {
            order.push(['note', sortOrder]);
        } else if (sortBy === 'nom') {
            order.push(['nom', sortOrder]);
        } else if (sortBy === 'localisation') {
            order.push(['localisation', sortOrder]);
        } else {
            order.push(['created_at', 'DESC']);
        }

        // Récupération avec pagination
        const { count, rows: artisans } = await Artisan.findAndCountAll({
            where,
            include: [includeOptions],
            order,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            pagination: {
                total: count,
                limit: parseInt(limit),
                offset: parseInt(offset),
                pages: Math.ceil(count / limit)
            },
            data: artisans
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 2. ARTISANS DU MOIS
// =============================================
exports.getTopArtisans = async (req, res, next) => {
    try {
        const { limit = 3 } = req.query;

        const artisans = await Artisan.findAll({
            where: { is_top: true },
            include: [{
                model: Specialite,
                as: 'specialite',
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }],
            order: [['note', 'DESC']],
            limit: parseInt(limit)
        });

        res.json({
            success: true,
            count: artisans.length,
            data: artisans
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 4. STATISTIQUES GLOBALES
// =============================================
exports.getStats = async (req, res, next) => {
    try {
        const [
            totalArtisans,
            totalCategories,
            totalSpecialites,
            noteMoyenne,
            topNotes,
            repartitionParCategorie
        ] = await Promise.all([
            // Nombre total d'artisans
            Artisan.count(),
            
            // Nombre de catégories
            Categorie.count(),
            
            // Nombre de spécialités
            Specialite.count(),
            
            // Note moyenne générale
            Artisan.findOne({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('note')), 'moyenne'],
                    [Sequelize.fn('MIN', Sequelize.col('note')), 'min'],
                    [Sequelize.fn('MAX', Sequelize.col('note')), 'max']
                ]
            }),
            
            // Top 5 des meilleurs artisans
            Artisan.findAll({
                attributes: ['id_artisan', 'nom', 'note', 'localisation'],
                order: [['note', 'DESC']],
                limit: 5
            }),
            
            // Répartition par catégorie
            Categorie.findAll({
                attributes: [
                    'nom',
                    [Sequelize.fn('COUNT', Sequelize.col('specialites.artisans.id_artisan')), 'nombre']
                ],
                include: [{
                    model: Specialite,
                    as: 'specialites',
                    include: [{
                        model: Artisan,
                        as: 'artisans',
                        attributes: []
                    }],
                    attributes: []
                }],
                group: ['Categorie.id_categorie'],
                raw: true
            })
        ]);

        res.json({
            success: true,
            data: {
                total: {
                    artisans: totalArtisans,
                    categories: totalCategories,
                    specialites: totalSpecialites
                },
                notes: {
                    moyenne: parseFloat(noteMoyenne.dataValues.moyenne || 0).toFixed(2),
                    min: parseFloat(noteMoyenne.dataValues.min || 0).toFixed(1),
                    max: parseFloat(noteMoyenne.dataValues.max || 0).toFixed(1)
                },
                topArtisans: topNotes,
                repartition: repartitionParCategorie
            }
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 5. RÉCUPÉRATION PAR ID (AVEC TOUT)
// =============================================
exports.getArtisanById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const artisan = await Artisan.findByPk(id, {
            include: [{
                model: Specialite,
                as: 'specialite',
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }]
        });

        if (!artisan) {
            return res.status(404).json({
                success: false,
                message: '❌ Artisan non trouvé'
            });
        }

        // Compter le nombre d'artisans dans la même spécialité
        const sameSpecialiteCount = await Artisan.count({
            where: {
                id_specialite: artisan.id_specialite,
                id_artisan: { [Op.ne]: id }
            }
        });

        // Récupérer les artisans similaires (même spécialité)
        const similarArtisans = await Artisan.findAll({
            where: {
                id_specialite: artisan.id_specialite,
                id_artisan: { [Op.ne]: id }
            },
            attributes: ['id_artisan', 'nom', 'note', 'localisation'],
            limit: 3,
            order: [['note', 'DESC']]
        });

        res.json({
            success: true,
            data: {
                ...artisan.toJSON(),
                stats: {
                    sameSpecialiteCount,
                    similarArtisans
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 6. FILTRAGE PAR CATÉGORIE
// =============================================
exports.getArtisansByCategorie = async (req, res, next) => {
    try {
        const { categorieId } = req.params;
        const { limit = 50, offset = 0 } = req.query;

        const artisans = await Artisan.findAndCountAll({
            include: [{
                model: Specialite,
                as: 'specialite',
                where: { id_categorie: categorieId },
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['note', 'DESC']]
        });

        res.json({
            success: true,
            pagination: {
                total: artisans.count,
                limit: parseInt(limit),
                offset: parseInt(offset)
            },
            data: artisans.rows
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 7. FILTRAGE PAR SPÉCIALITÉ
// =============================================
exports.getArtisansBySpecialite = async (req, res, next) => {
    try {
        const { specialiteId } = req.params;
        const { limit = 50, offset = 0 } = req.query;

        const artisans = await Artisan.findAndCountAll({
            where: { id_specialite: specialiteId },
            include: [{
                model: Specialite,
                as: 'specialite',
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['note', 'DESC']]
        });

        res.json({
            success: true,
            pagination: {
                total: artisans.count,
                limit: parseInt(limit),
                offset: parseInt(offset)
            },
            data: artisans.rows
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 8. FILTRAGE PAR VILLE
// =============================================
exports.getArtisansByVille = async (req, res, next) => {
    try {
        const { ville } = req.params;
        const { limit = 50, offset = 0 } = req.query;

        const artisans = await Artisan.findAndCountAll({
            where: {
                localisation: { [Op.like]: `%${ville}%` }
            },
            include: [{
                model: Specialite,
                as: 'specialite',
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['note', 'DESC']]
        });

        res.json({
            success: true,
            ville,
            pagination: {
                total: artisans.count,
                limit: parseInt(limit),
                offset: parseInt(offset)
            },
            data: artisans.rows
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 9. TOP ARTISANS PAR NOTE
// =============================================
exports.getTopRatedArtisans = async (req, res, next) => {
    try {
        const { limit = 10, noteMin = 4.5 } = req.query;

        const artisans = await Artisan.findAll({
            where: {
                note: { [Op.gte]: parseFloat(noteMin) }
            },
            include: [{
                model: Specialite,
                as: 'specialite',
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }],
            order: [['note', 'DESC']],
            limit: parseInt(limit)
        });

        res.json({
            success: true,
            noteMinimum: parseFloat(noteMin),
            count: artisans.length,
            data: artisans
        });
    } catch (error) {
        next(error);
    }
};
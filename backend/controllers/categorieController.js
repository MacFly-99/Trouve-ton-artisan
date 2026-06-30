const { Categorie, Specialite, Artisan } = require('../models');
const { Op, Sequelize } = require('sequelize');

// =============================================
// 1. TOUTES LES CATÉGORIES
// =============================================
exports.getAllCategories = async (req, res, next) => {
    try {
        const { includeArtisans = 'false' } = req.query;

        const includeOptions = [{
            model: Specialite,
            as: 'specialites'
        }];

        if (includeArtisans === 'true') {
            includeOptions[0].include = [{
                model: Artisan,
                as: 'artisans'
            }];
        }

        const categories = await Categorie.findAll({
            include: includeOptions,
            order: [['nom', 'ASC']]
        });

        res.json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 2. CATÉGORIE PAR ID
// =============================================
exports.getCategorieById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categorie = await Categorie.findByPk(id, {
            include: [{
                model: Specialite,
                as: 'specialites',
                include: [{
                    model: Artisan,
                    as: 'artisans'
                }]
            }]
        });

        if (!categorie) {
            return res.status(404).json({
                success: false,
                message: '❌ Catégorie non trouvée'
            });
        }

        res.json({
            success: true,
            data: categorie
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 3. SPÉCIALITÉS D'UNE CATÉGORIE
// =============================================
exports.getSpecialitesByCategorie = async (req, res, next) => {
    try {
        const { id } = req.params;

        const specialites = await Specialite.findAll({
            where: { id_categorie: id },
            include: [{
                model: Categorie,
                as: 'categorie'
            }],
            order: [['nom', 'ASC']]
        });

        res.json({
            success: true,
            categorie_id: parseInt(id),
            count: specialites.length,
            data: specialites
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 4. ARTISANS D'UNE CATÉGORIE
// =============================================
exports.getArtisansByCategorie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit = 50, offset = 0 } = req.query;

        const artisans = await Artisan.findAndCountAll({
            include: [{
                model: Specialite,
                as: 'specialite',
                where: { id_categorie: id },
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
            categorie_id: parseInt(id),
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
// 5. STATISTIQUES D'UNE CATÉGORIE
// =============================================
exports.getCategorieStats = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [categorie, stats] = await Promise.all([
            Categorie.findByPk(id),
            Artisan.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('id_artisan')), 'total'],
                    [Sequelize.fn('AVG', Sequelize.col('note')), 'moyenne'],
                    [Sequelize.fn('MAX', Sequelize.col('note')), 'max']
                ],
                include: [{
                    model: Specialite,
                    as: 'specialite',
                    where: { id_categorie: id },
                    attributes: []
                }]
            })
        ]);

        if (!categorie) {
            return res.status(404).json({
                success: false,
                message: '❌ Catégorie non trouvée'
            });
        }

        // Top artisans de cette catégorie
        const topArtisans = await Artisan.findAll({
            include: [{
                model: Specialite,
                as: 'specialite',
                where: { id_categorie: id }
            }],
            order: [['note', 'DESC']],
            limit: 5
        });

        res.json({
            success: true,
            data: {
                categorie: categorie.nom,
                stats: {
                    total: parseInt(stats[0]?.dataValues?.total || 0),
                    moyenne: parseFloat(stats[0]?.dataValues?.moyenne || 0).toFixed(2),
                    max: parseFloat(stats[0]?.dataValues?.max || 0).toFixed(1)
                },
                topArtisans
            }
        });
    } catch (error) {
        next(error);
    }
};
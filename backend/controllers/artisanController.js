const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');

// Récupérer tous les artisans (avec filtres)
exports.getAllArtisans = async (req, res, next) => {
    try {
        const { categorie, specialite, search, top } = req.query;
        const where = {};

        // Filtre par recherche
        if (search) {
            where.nom = { [Op.like]: `%${search}%` };
        }

        // Filtre par catégorie
        let includeSpecialite = {
            model: Specialite,
            as: 'specialite'
        };

        if (categorie) {
            includeSpecialite.include = [{
                model: Categorie,
                as: 'categorie',
                where: { nom: categorie }
            }];
        }

        // Filtre par spécialité
        if (specialite) {
            includeSpecialite.where = { nom: specialite };
        }

        // Filtre Top artisans
        if (top === 'true') {
            where.is_top = true;
        }

        const artisans = await Artisan.findAll({
            where,
            include: [includeSpecialite],
            order: [['note', 'DESC']]
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

// Récupérer les artisans du mois (Top)
exports.getTopArtisans = async (req, res, next) => {
    try {
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
            limit: 3
        });

        res.json({
            success: true,
            data: artisans
        });
    } catch (error) {
        next(error);
    }
};

// Récupérer un artisan par ID
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
                message: 'Artisan non trouvé'
            });
        }

        res.json({
            success: true,
            data: artisan
        });
    } catch (error) {
        next(error);
    }
};

// Recherche d'artisans
exports.searchArtisans = async (req, res, next) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'La recherche doit contenir au moins 2 caractères'
            });
        }

        const artisans = await Artisan.findAll({
            where: {
                nom: { [Op.like]: `%${q}%` }
            },
            include: [{
                model: Specialite,
                as: 'specialite',
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }],
            order: [['note', 'DESC']]
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
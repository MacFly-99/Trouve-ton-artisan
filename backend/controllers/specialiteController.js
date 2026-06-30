const { Specialite, Categorie, Artisan } = require('../models');
const { Sequelize } = require('sequelize');

// =============================================
// 1. TOUTES LES SPÉCIALITÉS
// =============================================
exports.getAllSpecialites = async (req, res, next) => {
    try {
        const specialites = await Specialite.findAll({
            include: [{
                model: Categorie,
                as: 'categorie'
            }],
            order: [['nom', 'ASC']]
        });

        res.json({
            success: true,
            count: specialites.length,
            data: specialites
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 2. SPÉCIALITÉ PAR ID
// =============================================
exports.getSpecialiteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const specialite = await Specialite.findByPk(id, {
            include: [{
                model: Categorie,
                as: 'categorie'
            }]
        });

        if (!specialite) {
            return res.status(404).json({
                success: false,
                message: '❌ Spécialité non trouvée'
            });
        }

        res.json({
            success: true,
            data: specialite
        });
    } catch (error) {
        next(error);
    }
};

// =============================================
// 3. ARTISANS D'UNE SPÉCIALITÉ
// =============================================

exports.getArtisansBySpecialite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit = 50, offset = 0 } = req.query;

        const artisans = await Artisan.findAndCountAll({
            where: { id_specialite: id },
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
            specialite_id: parseInt(id),
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
// 4. STATISTIQUES D'UNE SPÉCIALITÉ
// =============================================
exports.getSpecialiteStats = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [specialite, stats] = await Promise.all([
            Specialite.findByPk(id, {
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            }),
            Artisan.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('id_artisan')), 'total'],
                    [Sequelize.fn('AVG', Sequelize.col('note')), 'moyenne'],
                    [Sequelize.fn('MAX', Sequelize.col('note')), 'max'],
                    [Sequelize.fn('MIN', Sequelize.col('note')), 'min']
                ],
                where: { id_specialite: id }
            })
        ]);

        if (!specialite) {
            return res.status(404).json({
                success: false,
                message: '❌ Spécialité non trouvée'
            });
        }

        res.json({
            success: true,
            data: {
                specialite: specialite.nom,
                categorie: specialite.Categorie?.nom,
                stats: {
                    total: parseInt(stats[0]?.dataValues?.total || 0),
                    moyenne: parseFloat(stats[0]?.dataValues?.moyenne || 0).toFixed(2),
                    max: parseFloat(stats[0]?.dataValues?.max || 0).toFixed(1),
                    min: parseFloat(stats[0]?.dataValues?.min || 0).toFixed(1)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
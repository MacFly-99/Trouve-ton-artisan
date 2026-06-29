const { Categorie, Specialite, Artisan } = require('../models');

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Categorie.findAll({
            include: [{
                model: Specialite,
                as: 'specialites',
                include: [{
                    model: Artisan,
                    as: 'artisans'
                }]
            }]
        });

        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

// Récupérer une catégorie par ID
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
                message: 'Catégorie non trouvée'
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
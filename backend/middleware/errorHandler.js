// Gestionnaire d'erreurs global
const errorHandler = (err, req, res, next) => {
    console.error('❌ Erreur:', err);

    // Erreurs Sequelize
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Erreur de validation',
            errors: err.errors.map(e => e.message)
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            success: false,
            message: 'Ce nom existe déjà',
            errors: err.errors.map(e => e.message)
        });
    }

    // Erreur générique
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;
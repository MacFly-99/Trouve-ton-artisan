// Middleware de vérification de la clé API
require('dotenv').config();

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: '❌ Clé API manquante'
        });
    }

    if (apiKey !== validApiKey) {
        return res.status(403).json({
            success: false,
            message: '❌ Clé API invalide'
        });
    }

    next();
};

module.exports = verifyApiKey;
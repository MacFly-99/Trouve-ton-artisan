const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================
// SÉCURITÉ
// =============================================

// Helmet pour sécuriser les headers HTTP
app.use(helmet());

// Rate limiting pour éviter les attaques par force brute
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par IP
    message: {
        success: false,
        message: '❌ Trop de requêtes, veuillez réessayer plus tard'
    }
});
app.use('/api', limiter);

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-api-key']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================
// LOGGING (optionnel)
// =============================================
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

// =============================================
// ROUTES
// =============================================

// Health check
app.get('/', (req, res) => {
    res.json({
        name: '🚀 Trouve ton artisan - API',
        version: '1.0.0',
        status: 'OK',
        endpoints: {
            artisans: '/api/artisans',
            categories: '/api/categories',
            specialites: '/api/specialites',
            health: '/api/health'
        }
    });
});

// Routes API
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '❌ Route non trouvée'
    });
});

// Error handler
app.use(errorHandler);

// =============================================
// DÉMARRAGE
// =============================================
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📌 API Key: ${process.env.API_KEY}`);
    console.log(`📚 Documentation: http://localhost:${PORT}/`);
});
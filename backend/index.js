const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

// =============================================
// SÉCURITÉ
// =============================================

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: '❌ Trop de requêtes, veuillez réessayer plus tard'
    }
});

app.use('/api', limiter);

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-api-key']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================
// LOGGING
// =============================================

app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

// =============================================
// ROUTES
// =============================================

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
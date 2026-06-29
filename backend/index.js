const express = require('express');
const cors = require('cors');
require('dotenv').config();

const artisanRoutes = require('./routes/artisanRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🚀 API Trouve ton artisan - Auvergne-Rhône-Alpes',
        version: '1.0.0',
        endpoints: {
            artisans: '/api/artisans',
            categories: '/api/categories'
        }
    });
});

// Routes API
app.use('/api/artisans', artisanRoutes);
app.use('/api/categories', categorieRoutes);

// Gestionnaire d'erreurs
app.use(errorHandler);

// Gestion des routes 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📌 API Key: ${process.env.API_KEY}`);
});
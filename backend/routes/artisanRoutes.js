const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');
const verifyApiKey = require('../middleware/auth');

// Toutes les routes nécessitent une clé API
router.use(verifyApiKey);

// =============================================
// ROUTES PRINCIPALES
// =============================================

// GET /api/artisans - Récupérer tous les artisans (avec filtres)
router.get('/', artisanController.getAllArtisans);

// GET /api/artisans/top - Récupérer les artisans du mois
router.get('/top', artisanController.getTopArtisans);

// GET /api/artisans/search - Rechercher des artisans
router.get('/search', artisanController.searchArtisans);

// GET /api/artisans/stats - Statistiques globales
router.get('/stats', artisanController.getStats);

// =============================================
// ROUTES PAR ID
// =============================================

// GET /api/artisans/:id - Récupérer un artisan
router.get('/:id', artisanController.getArtisanById);

// =============================================
// ROUTES DE FILTRAGE AVANCÉ
// =============================================

// GET /api/artisans/categorie/:categorieId - Par catégorie
router.get('/categorie/:categorieId', artisanController.getArtisansByCategorie);

// GET /api/artisans/specialite/:specialiteId - Par spécialité
router.get('/specialite/:specialiteId', artisanController.getArtisansBySpecialite);

// GET /api/artisans/region/:ville - Par région/ville
router.get('/region/:ville', artisanController.getArtisansByVille);

// GET /api/artisans/notes/top - Meilleurs artisans par note
router.get('/notes/top', artisanController.getTopRatedArtisans);

module.exports = router;
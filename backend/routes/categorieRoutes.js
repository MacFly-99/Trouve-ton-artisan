const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');
const verifyApiKey = require('../middleware/auth');

router.use(verifyApiKey);

// GET /api/categories - Toutes les catégories
router.get('/', categorieController.getAllCategories);

// GET /api/categories/:id - Une catégorie
router.get('/:id', categorieController.getCategorieById);

// GET /api/categories/:id/specialites - Spécialités d'une catégorie
router.get('/:id/specialites', categorieController.getSpecialitesByCategorie);

// GET /api/categories/:id/artisans - Artisans d'une catégorie
router.get('/:id/artisans', categorieController.getArtisansByCategorie);

// GET /api/categories/:id/stats - Stats d'une catégorie
router.get('/:id/stats', categorieController.getCategorieStats);
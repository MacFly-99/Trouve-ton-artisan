const express = require('express');
const router = express.Router();
const specialiteController = require('../controllers/specialiteController');
const verifyApiKey = require('../middleware/auth');

router.use(verifyApiKey);

// GET /api/specialites - Toutes les spécialités
router.get('/', specialiteController.getAllSpecialites);

// GET /api/specialites/:id - Une spécialité
router.get('/:id', specialiteController.getSpecialiteById);

// GET /api/specialites/:id/artisans - Artisans d'une spécialité
router.get('/:id/artisans', specialiteController.getArtisansBySpecialite);

// GET /api/specialites/:id/stats - Stats d'une spécialité
router.get('/:id/stats', specialiteController.getSpecialiteStats);
const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');
const verifyApiKey = require('../middleware/auth');

// Toutes les routes nécessitent une clé API
router.use(verifyApiKey);

router.get('/', artisanController.getAllArtisans);
router.get('/top', artisanController.getTopArtisans);
router.get('/search', artisanController.searchArtisans);
router.get('/:id', artisanController.getArtisanById);

module.exports = router;
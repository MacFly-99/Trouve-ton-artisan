const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');
const verifyApiKey = require('../middleware/auth');

// Toutes les routes nécessitent une clé API
router.use(verifyApiKey);

router.get('/', categorieController.getAllCategories);
router.get('/:id', categorieController.getCategorieById);

module.exports = router;
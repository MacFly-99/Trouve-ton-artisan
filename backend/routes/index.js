const express = require('express');
const router = express.Router();

const artisanRoutes = require('./artisanRoutes');
const categorieRoutes = require('./categorieRoutes');
const specialiteRoutes = require('./specialiteRoutes');

// Routes principales
router.use('/artisans', artisanRoutes);
router.use('/categories', categorieRoutes);
router.use('/specialites', specialiteRoutes);

module.exports = router;
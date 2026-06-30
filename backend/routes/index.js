const express = require('express');
const router = express.Router();

const artisanRoutes = require('./artisanRoutes');
const categorieRoutes = require('./categorieRoutes');
const specialiteRoutes = require('./specialiteRoutes');

// Routes principales
router.use('/artisans', artisanRoutes);
router.use('/categories', categorieRoutes);
router.use('/specialites', specialiteRoutes);

router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

module.exports = router;
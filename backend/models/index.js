const sequelize = require('../config/database');
const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

module.exports = {
    sequelize,
    Categorie,
    Specialite,
    Artisan
};
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categorie = require('./Categorie');

const Specialite = sequelize.define('Specialite', {
    id_specialite: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categorie,
            key: 'id_categorie'
        }
    }
}, {
    tableName: 'specialite',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Associations
Specialite.belongsTo(Categorie, {
    foreignKey: 'id_categorie',
    as: 'categorie'
});

Categorie.hasMany(Specialite, {
    foreignKey: 'id_categorie',
    as: 'specialites'
});

module.exports = Specialite;
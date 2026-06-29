const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Specialite = require('./Specialite');

const Artisan = sequelize.define('Artisan', {
    id_artisan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },
    note: {
        type: DataTypes.DECIMAL(3, 1),
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
        }
    },
    a_propos: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    localisation: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    site_web: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    is_top: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    id_specialite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Specialite,
            key: 'id_specialite'
        }
    }
}, {
    tableName: 'artisan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Associations
Artisan.belongsTo(Specialite, {
    foreignKey: 'id_specialite',
    as: 'specialite'
});

Specialite.hasMany(Artisan, {
    foreignKey: 'id_specialite',
    as: 'artisans'
});

module.exports = Artisan;
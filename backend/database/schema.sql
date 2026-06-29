-- =============================================
-- SCHEMA DE LA BASE DE DONNÉES
-- Projet : Trouve ton artisan - Auvergne-Rhône-Alpes
-- =============================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan;
USE trouve_ton_artisan;

-- =============================================
-- TABLE CATEGORIE
-- =============================================
CREATE TABLE categorie (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE SPECIALITE
-- =============================================
CREATE TABLE specialite (
    id_specialite INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    id_categorie INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE ARTISAN
-- =============================================
CREATE TABLE artisan (
    id_artisan INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    note DECIMAL(3,1) DEFAULT 0,
    a_propos TEXT,
    localisation VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    image_url VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    is_top BOOLEAN DEFAULT FALSE,
    id_specialite INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- INDEX POUR OPTIMISER LES PERFORMANCES
-- =============================================
CREATE INDEX idx_artisan_specialite ON artisan(id_specialite);
CREATE INDEX idx_artisan_top ON artisan(is_top);
CREATE INDEX idx_specialite_categorie ON specialite(id_categorie);
-- =============================================
-- VÉRIFICATION DE L'INTÉGRITÉ DES DONNÉES
-- Projet : Trouve ton artisan - Auvergne-Rhône-Alpes
-- =============================================

USE trouve_ton_artisan;

-- =============================================
-- 1. COMPTAGE DES ENREGISTREMENTS
-- =============================================
SELECT '=== COMPTAGE DES ENREGISTREMENTS ===' AS '';

SELECT 
    'Catégories' AS 'Table',
    COUNT(*) AS 'Nombre',
    'OK' AS 'Statut'
FROM categorie
UNION
SELECT 
    'Spécialités',
    COUNT(*),
    IF(COUNT(*) > 0, 'OK', 'ERREUR')
FROM specialite
UNION
SELECT 
    'Artisans',
    COUNT(*),
    IF(COUNT(*) > 0, 'OK', 'ERREUR')
FROM artisan;

-- =============================================
-- 2. VÉRIFICATION DES RELATIONS
-- =============================================
SELECT '=== VÉRIFICATION DES RELATIONS ===' AS '';

-- Spécialités sans catégorie
SELECT 
    'Spécialités sans catégorie' AS 'Contrôle',
    COUNT(*) AS 'Nombre',
    IF(COUNT(*) = 0, '✅ OK', '❌ ERREUR') AS 'Statut'
FROM specialite s
LEFT JOIN categorie c ON s.id_categorie = c.id_categorie
WHERE c.id_categorie IS NULL;

-- Artisans sans spécialité
SELECT 
    'Artisans sans spécialité' AS 'Contrôle',
    COUNT(*) AS 'Nombre',
    IF(COUNT(*) = 0, '✅ OK', '❌ ERREUR') AS 'Statut'
FROM artisan a
LEFT JOIN specialite s ON a.id_specialite = s.id_specialite
WHERE s.id_specialite IS NULL;

-- =============================================
-- 3. VÉRIFICATION DES DOUBLONS
-- =============================================
SELECT '=== VÉRIFICATION DES DOUBLONS ===' AS '';

-- Noms de catégories en double
SELECT 
    'Catégories en double' AS 'Contrôle',
    COUNT(*) - COUNT(DISTINCT nom) AS 'Doublons',
    IF(COUNT(*) = COUNT(DISTINCT nom), '✅ OK', '❌ ERREUR') AS 'Statut'
FROM categorie;

-- Noms de spécialités en double
SELECT 
    'Spécialités en double' AS 'Contrôle',
    COUNT(*) - COUNT(DISTINCT nom) AS 'Doublons',
    IF(COUNT(*) = COUNT(DISTINCT nom), '✅ OK', '❌ ERREUR') AS 'Statut'
FROM specialite;

-- Noms d'artisans en double
SELECT 
    'Artisans en double' AS 'Contrôle',
    COUNT(*) - COUNT(DISTINCT nom) AS 'Doublons',
    IF(COUNT(*) = COUNT(DISTINCT nom), '✅ OK', '❌ ERREUR') AS 'Statut'
FROM artisan;

-- =============================================
-- 4. VÉRIFICATION DES NOTES
-- =============================================
SELECT '=== VÉRIFICATION DES NOTES ===' AS '';

SELECT 
    'Notes > 5' AS 'Contrôle',
    COUNT(*) AS 'Nombre',
    IF(COUNT(*) = 0, '✅ OK', '❌ ERREUR') AS 'Statut'
FROM artisan
WHERE note > 5;

SELECT 
    'Notes < 0' AS 'Contrôle',
    COUNT(*) AS 'Nombre',
    IF(COUNT(*) = 0, '✅ OK', '❌ ERREUR') AS 'Statut'
FROM artisan
WHERE note < 0;

-- =============================================
-- 5. VÉRIFICATION DES EMAILS
-- =============================================
SELECT '=== VÉRIFICATION DES EMAILS ===' AS '';

SELECT 
    'Emails invalides' AS 'Contrôle',
    COUNT(*) AS 'Nombre',
    IF(COUNT(*) = 0, '✅ OK', '❌ ERREUR') AS 'Statut'
FROM artisan
WHERE email NOT LIKE '%@%.%';

-- =============================================
-- 6. STATISTIQUES DÉTAILLÉES
-- =============================================
SELECT '=== STATISTIQUES DÉTAILLÉES ===' AS '';

-- Répartition par catégorie
SELECT 
    c.nom AS 'Catégorie',
    COUNT(DISTINCT s.id_specialite) AS 'Nb spécialités',
    COUNT(a.id_artisan) AS 'Nb artisans',
    ROUND(AVG(a.note), 2) AS 'Note moyenne',
    MIN(a.note) AS 'Note min',
    MAX(a.note) AS 'Note max'
FROM categorie c
LEFT JOIN specialite s ON c.id_categorie = s.id_categorie
LEFT JOIN artisan a ON s.id_specialite = a.id_specialite
GROUP BY c.id_categorie
ORDER BY c.nom;

-- Artisans Top par catégorie
SELECT 
    c.nom AS 'Catégorie',
    COUNT(CASE WHEN a.is_top = 1 THEN 1 END) AS 'Top artisans',
    GROUP_CONCAT(
        CASE WHEN a.is_top = 1 
        THEN CONCAT(a.nom, ' (', a.note, '⭐)') 
        END 
        SEPARATOR ', '
    ) AS 'Liste des tops'
FROM categorie c
LEFT JOIN specialite s ON c.id_categorie = s.id_categorie
LEFT JOIN artisan a ON s.id_specialite = a.id_specialite
GROUP BY c.id_categorie
HAVING COUNT(CASE WHEN a.is_top = 1 THEN 1 END) > 0;

-- =============================================
-- 7. EXPORT DES DONNÉES RÉCAPITULATIVES
-- =============================================
SELECT '=== RÉCAPITULATIF COMPLET ===' AS '';

SELECT 
    a.nom AS 'Artisan',
    s.nom AS 'Spécialité',
    c.nom AS 'Catégorie',
    a.note AS '⭐ Note',
    a.localisation AS '📍 Ville',
    a.email AS '📧 Email',
    CASE 
        WHEN a.site_web IS NOT NULL THEN '✅ Oui' 
        ELSE '❌ Non' 
    END AS '🌐 Site web',
    CASE 
        WHEN a.is_top = 1 THEN '⭐ TOP' 
        ELSE '' 
    END AS '🏆 Statut'
FROM artisan a
JOIN specialite s ON a.id_specialite = s.id_specialite
JOIN categorie c ON s.id_categorie = c.id_categorie
ORDER BY c.nom, s.nom, a.note DESC;
-- =============================================
-- ALIMENTATION DE LA BASE DE DONNÉES
-- Projet : Trouve ton artisan - Auvergne-Rhône-Alpes
-- =============================================

USE trouve_ton_artisan;

-- =============================================
-- 1. INSERTION DES CATÉGORIES
-- =============================================
INSERT INTO categorie (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- =============================================
-- 2. INSERTION DES SPÉCIALITÉS
-- =============================================
INSERT INTO specialite (nom, id_categorie) VALUES
-- Alimentation (id_categorie = 1)
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1),
('Traiteur', 1),
-- Bâtiment (id_categorie = 2)
('Chauffagiste', 2),
('Electricien', 2),
('Menuisier', 2),
('Plombier', 2),
-- Fabrication (id_categorie = 3)
('Bijoutier', 3),
('Couturier', 3),
('Ferronnier', 3),
-- Services (id_categorie = 4)
('Coiffeur', 4),
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesign', 4);

-- =============================================
-- 3. INSERTION DES ARTISANS
-- =============================================
INSERT INTO artisan (
    nom, note, a_propos, localisation, 
    site_web, email, is_top, id_specialite
) VALUES
-- ===== ALIMENTATION =====
(
    'Boucherie Dumont', 4.5,
    'Artisan boucher depuis 3 générations, nous sélectionnons les meilleures viandes locales pour vous offrir une qualité exceptionnelle. Notre savoir-faire traditionnel allié à la modernité de nos équipements vous garantit des produits frais et savoureux.',
    'Lyon', NULL, 'boucherie.dumond@gmail.com', FALSE, 1
),
(
    'Au pain chaud', 4.8,
    'Boulangerie artisanale proposant des pains au levain, des viennoiseries et des pâtisseries faites maison. Tous nos produits sont élaborés avec des farines bio et des ingrédients de première qualité.',
    'Montélimar', NULL, 'aupainchaud@hotmail.com', TRUE, 2
),
(
    'Chocolaterie Labbé', 4.9,
    'Maître chocolatier depuis 1950, nous créons des chocolats fins et originaux. Notre atelier à Lyon vous invite à découvrir nos créations uniques, alliant tradition et innovation.',
    'Lyon', 'https://chocolaterie-labbe.fr', 'chocolaterie-labbe@gmail.com', TRUE, 3
),
(
    'Traiteur Truchon', 4.1,
    'Traiteur événementiel pour vos réceptions, mariages et séminaires. Nous proposons une cuisine créative à base de produits frais et de saison.',
    'Lyon', 'https://truchon-traiteur.fr', 'contact@truchon-traiteur.fr', FALSE, 4
),

-- ===== BÂTIMENT =====
(
    'Orville Salmons', 5.0,
    'Expert en chauffage et climatisation, nous intervenons pour l''installation, l''entretien et le dépannage de tous types de systèmes. Notre équipe de techniciens qualifiés vous assure un service rapide et professionnel.',
    'Evian', NULL, 'o-salmons@live.com', TRUE, 5
),
(
    'Mont Blanc Électricité', 4.5,
    'Entreprise d''électricité générale intervenant dans le secteur du Mont-Blanc et ses environs. Nous réalisons tous vos travaux d''installation, de rénovation et de mise aux normes.',
    'Chamonix', 'https://mont-blanc-electricite.com', 'contact@mont-blanc-electricite.com', FALSE, 6
),
(
    'Boutot & fils', 4.7,
    'Menuiserie artisanale spécialisée dans la fabrication et l''installation de meubles sur mesure, cuisine, escaliers et agencement intérieur. Travail du bois noble et finitions soignées.',
    'Bourg-en-bresse', 'https://boutot-menuiserie.com', 'boutot-menuiserie@gmail.com', FALSE, 7
),
(
    'Vallis Bellemare', 4.0,
    'Plomberie-chauffage depuis 1985. Nous intervenons pour tous vos travaux de plomberie, sanitaire, chauffage et rénovation énergétique.',
    'Vienne', 'https://plomberie-bellemare.com', 'v.bellemare@gmail.com', FALSE, 8
),

-- ===== FABRICATION =====
(
    'Claude Quinn', 4.2,
    'Bijouterie-joaillerie d''art, création de pièces uniques en or, argent et pierres précieuses. Sur mesure et réparation de bijoux anciens.',
    'Aix-les-bains', NULL, 'claude.quinn@gmail.com', FALSE, 9
),
(
    'Amitee Lécuyer', 4.5,
    'Couture sur mesure et retouches. Création de vêtements uniques, costumes, robes de mariée, et restauration de vêtements anciens. Savoir-faire artisanal et qualité française.',
    'Annecy', 'https://lecuyer-couture.com', 'a.amitee@hotmail.com', FALSE, 10
),
(
    'Ernest Carignan', 5.0,
    'Ferronnerie d''art depuis 1970. Création et restauration de grilles, portails, rampes d''escalier, balcons et mobilier en fer forgé. Un savoir-faire unique en région Auvergne-Rhône-Alpes.',
    'Le Puy-en-Velay', NULL, 'e-carigan@hotmail.com', FALSE, 11
),

-- ===== SERVICES =====
(
    'Royden Charbonneau', 3.8,
    'Coiffeur barbier traditionnel, spécialisé dans les coupes homme et barbe. Ambiance vintage et service personnalisé.',
    'Saint-Priest', NULL, 'r.charbonneau@gmail.com', FALSE, 12
),
(
    'Leala Dennis', 3.8,
    'Salon de coiffure mixte proposant coupes, colorations, mèches, balayage. Produits haut de gamme et conseils personnalisés.',
    'Chambéry', 'https://coiffure-teala-chambery.fr', 'L.dennos@hotmail.fr', FALSE, 12
),
(
    'C''est sup''hair', 4.1,
    'Salon de coiffure tendance pour toute la famille. Spécialisé dans les coupes modernes et le coiffage événementiel.',
    'Romans-sur-Isère', 'https://sup-hair.fr', 'sup-hair@gmail.com', FALSE, 12
),
(
    'Le monde des fleurs', 4.6,
    'Fleuristerie artisanale créant des bouquets et compositions florales pour toutes occasions. Fleurs fraîches locales et de saison.',
    'Annonay', 'https://le-monde-des-fleurs-annonay.fr', 'contact@le-monde-des-fleurs-annonay.fr', FALSE, 13
),
(
    'Valérie Laderoute', 4.5,
    'Toilettage canin et félin. Toilette douce, respectueuse du bien-être animal. Coupe, brossage, soins dermatologiques.',
    'Valence', NULL, 'v-laredoute@gmail.com', FALSE, 14
),
(
    'CM Graphisme', 4.4,
    'Agence de communication et webdesign. Création de sites web, logos, chartes graphiques, et stratégies de communication digitale.',
    'Valence', 'https://cm-graphisme.com', 'contact@cm-graphisme.com', FALSE, 15
);

-- =============================================
-- 4. VÉRIFICATION DES DONNÉES
-- =============================================
-- Afficher le nombre d'enregistrements
SELECT 'Catégories' AS 'Table', COUNT(*) AS 'Nombre' FROM categorie
UNION
SELECT 'Spécialités', COUNT(*) FROM specialite
UNION
SELECT 'Artisans', COUNT(*) FROM artisan;

-- Voir quelques exemples
SELECT 
    a.nom AS 'Artisan',
    s.nom AS 'Spécialité',
    c.nom AS 'Catégorie',
    a.note AS 'Note',
    a.localisation AS 'Ville',
    CASE WHEN a.is_top = 1 THEN '⭐ Top' ELSE '' END AS 'Top'
FROM artisan a
JOIN specialite s ON a.id_specialite = s.id_specialite
JOIN categorie c ON s.id_categorie = c.id_categorie
ORDER BY a.note DESC
LIMIT 10;
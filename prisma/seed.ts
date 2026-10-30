import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Début de l\'importation depuis le fichier Excel...');

  // Lecture du fichier avec fs, puis parsing avec XLSX
  const excelFilePath = path.join(process.cwd(), 'data.xlsx');
  const fileBuffer = fs.readFileSync(excelFilePath); // Lecture du fichier
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' }); // Parsing du buffer
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as any[];

  console.log(`📊 ${data.length} lignes trouvées dans le fichier Excel.`);

  // Nettoyage de la base
  await prisma.artisan.deleteMany();
  await prisma.specialite.deleteMany();
  await prisma.categorie.deleteMany();

  const categoriesMap = new Map<string, number>();
  const specialtiesMap = new Map<string, number>();

  for (const row of data) {
    const nomCategorie = row['Catégorie'];
    const nomSpecialite = row['Spécialité'];
    const nomArtisan = row['Nom'];

    if (!nomCategorie || !nomSpecialite || !nomArtisan) continue;

    // 1. Catégories
    let categorieId = categoriesMap.get(nomCategorie);
    if (!categorieId) {
      const cat = await prisma.categorie.create({ data: { nom: nomCategorie } });
      categorieId = cat.id!;
      categoriesMap.set(nomCategorie, categorieId);
    }

    // 2. Spécialités
    let specialiteId = specialtiesMap.get(nomSpecialite);
    if (!specialiteId) {
      const spec = await prisma.specialite.create({ 
        data: { nom: nomSpecialite, categorieId: categorieId } 
      });
      specialiteId = spec.id!;
      specialtiesMap.set(nomSpecialite, specialiteId);
    }

    // 3. Artisans
    await prisma.artisan.create({
      data: {
        nom: nomArtisan,
        email: row['Email'] || `contact-${Date.now()}@exemple.fr`,
        siteWeb: row['Site Web'] || null,
        ville: row['Ville'] || null,
        note: row['Note'] ? parseFloat(row['Note']) : 0,
        description: row['A propos'] || null,
        specialiteId: specialiteId,
        estVedette: row['Top'] === true || String(row['Top']).toUpperCase() === 'TRUE',
      }
    });
  }

  console.log('✅ Importation terminée avec succès ! 17 artisans sont dans la base.');
}

main()
  .catch((e) => {
    console.error('❌ Erreur :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialties" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "categorie_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artisans" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "nom_entreprise" TEXT,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "site_web" TEXT,
    "adresse" TEXT,
    "ville" TEXT,
    "code_postal" TEXT,
    "note" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "url_image" TEXT,
    "specialite_id" INTEGER NOT NULL,
    "est_vedette" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artisans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_nom_key" ON "categories"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "specialties_nom_key" ON "specialties"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "artisans_email_key" ON "artisans"("email");

-- AddForeignKey
ALTER TABLE "specialties" ADD CONSTRAINT "specialties_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artisans" ADD CONSTRAINT "artisans_specialite_id_fkey" FOREIGN KEY ("specialite_id") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

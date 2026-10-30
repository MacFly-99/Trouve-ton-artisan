import { prisma } from '@/lib/prisma';
import ArtisanCard from './ArtisanCard';

export default async function FeaturedArtisans() {
  // 1. On demande à Prisma de récupérer les 3 artisans qui sont en vedette
  const artisans = await prisma.artisan.findMany({
    where: { estVedette: true },
    include: { specialite: true }, // On inclut la spécialité pour l'afficher
    take: 3, // On n'en prend que 3
    orderBy: { note: 'desc' } // Les mieux notés d'abord
  });

  // Si aucun artisan en vedette, on n'affiche rien
  if (artisans.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        {/* La barre rouge de séparation */}
        <div className="w-20 h-1 bg-region-red mx-auto mb-6"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-region-dark">
          Les artisans du mois
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </section>
  );
}
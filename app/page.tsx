import FeaturedArtisans from "@/components/FeaturedArtisans";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Section Hero */}
      <section className="pt-20 pb-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-region-dark mb-6">
            Trouve ton artisan !
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-region-blue mb-8">
            Avec la région Auvergne-Rhône-Alpes
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez facilement un artisan qualifié dans la région pour tous vos projets.
            Consultez les profils, les notes et contactez-les directement.
          </p>
        </div>
      </section>

      {/* Section "Comment ça marche" (pour faire joli) */}
      <section className="py-16 px-4 bg-region-bg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-region-dark mb-12">Comment faire ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-region-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold mb-2">Choisir la catégorie</h3>
              <p className="text-gray-600 text-sm">Parcourez les catégories pour trouver la spécialité qui vous correspond.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-region-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold mb-2">Choisir un artisan</h3>
              <p className="text-gray-600 text-sm">Consultez les profils et les notes pour faire votre choix.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-region-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold mb-2">Le contacter</h3>
              <p className="text-gray-600 text-sm">Utilisez le formulaire de contact pour demander un devis.</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedArtisans />
      
    </main>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Section Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-region-dark mb-6">
            Trouve ton artisan !
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-region-blue mb-8">
            Avec la région Auvergne-Rhône-Alpes
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Trouvez facilement un artisan qualifié dans la région pour tous vos projets.
            Consultez les profils, les notes et contactez-les directement.
          </p>
        </div>
      </section>
    </main>
  );
}
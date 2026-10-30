export default function Footer() {
  return (
    <footer className="bg-region-dark text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Trouve ton artisan</h3>
          <p className="text-gray-300 text-sm">
            La plateforme officielle de la région Auvergne-Rhône-Alpes pour trouver l'artisan qu'il vous faut.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Liens utiles</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Mentions légales</a></li>
            <li><a href="#" className="hover:text-white">Données personnelles</a></li>
            <li><a href="#" className="hover:text-white">Accessibilité</a></li>
            <li><a href="#" className="hover:text-white">Cookies</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Contact</h4>
          <address className="not-italic text-sm text-gray-300 space-y-2">
            <p>101 cours Charlemagne<br />69269 LYON CEDEX 02</p>
            <p>04 26 73 40 00</p>
          </address>
        </div>

      </div>
      <div className="text-center text-xs text-gray-500 mt-12 pt-8 border-t border-gray-700">
        &copy; {new Date().getFullYear()} - Trouve ton artisan Région Auvergne-Rhône-Alpes
      </div>
    </footer>
  );
}
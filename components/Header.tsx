import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-100 h-20 flex items-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-6">
        
        <Link href="/" className="shrink-0">
          <img src="/Logo.png" alt="Trouve ton artisan" className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex gap-6 items-center font-medium text-region-text">
          <Link href="/artisans" className="hover:text-region-blue transition-colors">Tous</Link>
          <Link href="/artisans?categorie=Alimentation" className="hover:text-region-blue transition-colors">Alimentation</Link>
          <Link href="/artisans?categorie=Bâtiment" className="hover:text-region-blue transition-colors">Bâtiment</Link>
          <Link href="/artisans?categorie=Fabrication" className="hover:text-region-blue transition-colors">Fabrication</Link>
          <Link href="/artisans?categorie=Services" className="hover:text-region-blue transition-colors">Services</Link>
        </nav>

        <SearchBar />

      </div>
    </header>
  );
}
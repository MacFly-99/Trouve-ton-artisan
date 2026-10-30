'use client'; // On précise que c'est un composant client (pour le futur formulaire)

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <form className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Rechercher un artisan..."
        className="w-full bg-region-bg border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-region-blue text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        suppressHydrationWarning 
      />
    </form>
  );
}
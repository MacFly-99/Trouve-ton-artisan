import Link from 'next/link';
import { FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt } from 'react-icons/fa';

// On définit le type de données qu'on attend (basé sur Prisma)
type ArtisanProps = {
  artisan: {
    id: number;
    nom: string;
    ville: string | null;
    note: number;
    urlImage: string | null;
    specialite: {
      nom: string;
    };
  };
};

export default function ArtisanCard({ artisan }: ArtisanProps) {
  // Fonction pour afficher les étoiles
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    
    return stars;
  };

  return (
    <Link href={`/artisan/${artisan.id}`} className="block h-full group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
        
        {/* Image (on met un placeholder en attendant) */}
        <div className="h-48 bg-gray-100 relative">
          <img 
            src={artisan.urlImage || '/placeholder.jpg'} 
            alt={artisan.nom}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-region-dark mb-2">{artisan.nom}</h3>
          
          <div className="flex items-center gap-1 mb-3">
            {renderStars(artisan.note)}
            <span className="ml-2 font-semibold text-gray-600">{artisan.note.toFixed(1)}</span>
          </div>

          <div className="inline-block bg-region-bg text-region-blue text-sm font-medium px-3 py-1 rounded-full mb-3">
            {artisan.specialite?.nom || 'Spécialité'}
          </div>

          {artisan.ville && (
            <div className="flex items-center text-gray-500 text-sm">
              <FaMapMarkerAlt className="mr-2 text-region-blue" />
              {artisan.ville}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
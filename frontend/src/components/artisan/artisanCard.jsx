import { useNavigate } from 'react-router-dom';

const ArtisanCard = ({ artisan }) => {
  const navigate = useNavigate();

  const renderStars = (note) => {
    const fullStars = Math.floor(note || 0);
    const emptyStars = 5 - fullStars;
    return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  const handleClick = () => {
    navigate(`/artisan/${artisan.id_artisan}`);
  };

  return (
    <div className="artisan-card" onClick={handleClick}>
      {artisan.is_top && (
        <div className="badge bg-warning text-dark mb-2">🏆 Artisan du mois</div>
      )}
      <div className="artisan-name">{artisan.nom}</div>
      <div className="artisan-specialite">{artisan.specialite?.nom || 'Spécialité'}</div>
      <div className="stars mb-1">{renderStars(artisan.note)}</div>
      <div className="artisan-location">📍 {artisan.localisation}</div>
    </div>
  );
};

export default ArtisanCard;
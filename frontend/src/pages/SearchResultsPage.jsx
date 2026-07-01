import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchArtisans } from '../api/artisanApi';
import ArtisanCard from '../components/artisan/ArtisanCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) loadResults();
  }, [query]);

  const loadResults = async () => {
    setLoading(true);
    try {
      const response = await searchArtisans(query);
      setArtisans(response.data || []);
    } catch (error) {
      console.error('Erreur recherche:', error);
      setArtisans([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Recherche...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">🔍 Résultats pour "{query}" ({artisans.length})</h2>
      {artisans.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-4">Aucun artisan trouvé</p>
          <p className="text-muted">Essayez avec un autre terme</p>
        </div>
      ) : (
        <div className="row g-4">
          {artisans.map((artisan) => (
            <div key={artisan.id_artisan} className="col-12 col-sm-6 col-lg-4">
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
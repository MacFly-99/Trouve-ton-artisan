import { useState, useEffect } from 'react';
import { getTopArtisans, getStats } from '../api/artisanApi';
import ArtisanCard from '../components/artisan/ArtisanCard';

const HomePage = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [topResponse, statsResponse] = await Promise.all([
        getTopArtisans(),
        getStats(),
      ]);
      setTopArtisans(topResponse.data || []);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: '1', title: 'Choisir la catégorie', description: 'Sélectionnez dans le menu' },
    { number: '2', title: 'Choisir un artisan', description: 'Parcourez ou recherchez' },
    { number: '3', title: 'Contacter l\'artisan', description: 'Remplissez le formulaire' },
    { number: '4', title: 'Réponse sous 48h', description: 'L\'artisan vous répondra' },
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-primary">{stats.total?.artisans || 0}</h3>
                <p className="text-muted small">Artisans</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-primary">{stats.total?.categories || 0}</h3>
                <p className="text-muted small">Catégories</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-primary">{stats.total?.specialites || 0}</h3>
                <p className="text-muted small">Spécialités</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-primary">{stats.notes?.moyenne || 0} ⭐</h3>
                <p className="text-muted small">Note moyenne</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="steps-section">
        <h2 className="text-center mb-4">📍 Comment trouver mon artisan ?</h2>
        <div className="row g-4">
          {steps.map((step) => (
            <div key={step.number} className="col-12 col-md-3">
              <div className="text-center">
                <div className="step-number">{step.number}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Artisans */}
      {topArtisans.length > 0 && (
        <div className="my-5">
          <h2 className="mb-4">⭐ Artisans du mois</h2>
          <div className="row g-4">
            {topArtisans.map((artisan) => (
              <div key={artisan.id_artisan} className="col-12 col-sm-6 col-lg-4">
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
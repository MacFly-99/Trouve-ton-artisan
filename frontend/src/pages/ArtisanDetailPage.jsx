import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisanById } from '../api/artisanApi';

const ArtisanDetailPage = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtisan();
  }, [id]);

  const loadArtisan = async () => {
    try {
      const response = await getArtisanById(id);
      setArtisan(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (note) => {
    const fullStars = Math.floor(note || 0);
    const emptyStars = 5 - fullStars;
    return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="text-center py-5">
        <h2>❌ Artisan non trouvé</h2>
        <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="btn btn-outline-primary mb-4">← Retour</Link>

      <div className="row">
        <div className="col-lg-8">
          <div className="card p-4">
            <div className="d-flex align-items-start gap-4">
              <div
                className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '100px', height: '100px', fontSize: '3rem' }}
              >
                🏪
              </div>
              <div>
                <h1 className="h2">{artisan.nom}</h1>
                <div className="stars mb-2">{renderStars(artisan.note)}</div>
                <p className="text-primary fw-bold">{artisan.specialite?.nom}</p>
                <p className="text-muted">📍 {artisan.localisation}</p>
                {artisan.site_web && (
                  <a
                    href={artisan.site_web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    🌐 Visiter le site
                  </a>
                )}
              </div>
            </div>

            <hr className="my-4" />
            <div>
              <h3>📝 À propos</h3>
              <p>{artisan.a_propos || 'Aucune description disponible.'}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-4">
            <h3>📧 Contacter l'artisan</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Nom *</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Objet *</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message *</label>
                <textarea className="form-control" rows="4" required />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetailPage;
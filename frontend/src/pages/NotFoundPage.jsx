import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found-icon">🔍</div>
      <h1 className="not-found-title">Page non trouvée</h1>
      <p className="not-found-text">
        La page que vous avez demandée n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        🏠 Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
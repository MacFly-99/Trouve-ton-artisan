import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Contact</h5>
            <div className="footer-address">
              <p className="mb-1">101 cours Charlemagne</p>
              <p className="mb-1">CS 20033</p>
              <p className="mb-1">69269 LYON CEDEX 02</p>
              <p className="mb-1">France</p>
              <p className="mb-0">+33 (0)4 26 73 40 00</p>
            </div>
          </div>

          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Liens légaux</h5>
            <div className="d-flex flex-column">
              <Link to="/mentions-legales" className="text-white-50 text-decoration-none mb-1">
                Mentions légales
              </Link>
              <Link to="/donnees-personnelles" className="text-white-50 text-decoration-none mb-1">
                Données personnelles
              </Link>
              <Link to="/accessibilite" className="text-white-50 text-decoration-none mb-1">
                Accessibilité
              </Link>
              <Link to="/cookies" className="text-white-50 text-decoration-none mb-1">
                Cookies
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <h5>À propos</h5>
            <p className="text-white-50">
              Trouve ton artisan vous met en relation avec les artisans de la région Auvergne-Rhône-Alpes.
            </p>
          </div>
        </div>

        <hr className="border-light opacity-25" />
        <div className="text-center text-white-50 small">
          &copy; 2024 Trouve ton artisan - Auvergne-Rhône-Alpes
        </div>
      </div>
    </footer>
  );
};

export default Footer;
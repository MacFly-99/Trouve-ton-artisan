import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategories } from '../../api/artisanApi';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-6 col-md-3">
            <Link to="/" className="text-decoration-none text-white">
              <div className="logo">
                Trouve ton artisan !
                <div className="subtitle d-none d-sm-block">Avec la région Auvergne-Rhône-Alpes</div>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="col-md-6 d-none d-md-block">
            <nav className="nav justify-content-center">
              {categories.map((cat) => (
                <Link key={cat.id_categorie} to={`/categorie/${cat.nom}`} className="nav-link">
                  {cat.nom}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search */}
          <div className="col-6 col-md-3">
            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-icon">
                🔍
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Mobile */}
        <div className="d-md-none mt-3">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {categories.map((cat) => (
              <Link key={cat.id_categorie} to={`/categorie/${cat.nom}`} className="btn btn-outline-light btn-sm">
                {cat.nom}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
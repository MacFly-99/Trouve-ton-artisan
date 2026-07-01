import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ArtisanDetailPage from './pages/ArtisanDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import LegalPage from './pages/LegalPage';
import './styles/main.scss';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 container py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artisan/:id" element={<ArtisanDetailPage />} />
            <Route path="/recherche" element={<SearchResultsPage />} />
            <Route path="/categorie/:nom" element={<SearchResultsPage />} />
            <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
            <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
            <Route path="/accessibilite" element={<LegalPage title="Accessibilité" />} />
            <Route path="/cookies" element={<LegalPage title="Cookies" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
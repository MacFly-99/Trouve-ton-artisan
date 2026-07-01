const LegalPage = ({ title }) => {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 mb-4">📄 {title}</h1>
      <div className="card p-5">
        <div className="py-5">
          <h2 className="text-muted">🚧 Page en construction</h2>
          <p className="text-muted">Cette page sera bientôt disponible.</p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
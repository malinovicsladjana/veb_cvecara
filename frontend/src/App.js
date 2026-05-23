import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="content">
        <section className="hero" id="home">
          <div className="hero-text">
            <p className="eyebrow">Dobrodošli u cvećaru</p>
            <h1>
              Bloom <span>&amp; gift shop</span>
            </h1>
            <p>
              Sveže cveće, unikatni pokloni i detalji za svaku priliku.
              Pregledajte naš asortiman i naručite brzo i jednostavno.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

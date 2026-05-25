import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';

import slika_logo from './slika_logo.jpg';
import buket4 from './slike/buket4.jpg';
import buket6 from './slike/buket6.jpg';
import buket9 from './slike/buket9.jpg';
import bidermajer5 from './slike/bidermajer5.jpg';
import bidermajer6 from './slike/bidermajer6.jpg';
import bidermajer7 from './slike/bidermajer7.jpg';
import cvetni4 from './slike/cvetni4.jpg';
import cvetni5 from './slike/cvetni5.jpg';
import cvetni8 from './slike/cvetni8.jpg';
import saksijskocvece from './slike/saksijskocvece.jpg';
import saksija3 from './slike/saksija3.jpeg';
import saksija8 from './slike/saksija8.jpeg';
import poklon3 from './slike/poklon3.jpg';
import poklon7 from './slike/poklon7.jpg';
import poklonaranzmani from './slike/poklonaranzmani.jpg';
import baloni from './slike/baloni.jpg';
import baloni2 from './slike/baloni2.jpg';
import baloni4 from './slike/baloni4.jpg';

const featuredCategories = [
  { title: 'Buketi', image: buket4 },
  { title: 'Bidermajeri', image: bidermajer6 },
  { title: 'Cvetni aranžmani', image: cvetni4 },
  { title: 'Saksijsko cveće', image: saksijskocvece },
  { title: 'Poklon aranžmani', image: poklonaranzmani },
  { title: 'Baloni sa helijumom', image: baloni }
];

const productCards = [
  {
    id: 'buket-1',
    title: 'Buket 1',
    category: 'Buketi',
    image: buket4,
    price: '2.999 RSD'
  },
  {
    id: 'buket-2',
    title: 'Buket 2',
    category: 'Buketi',
    image: buket6,
    price: '3.299 RSD'
  },
  {
    id: 'buket-3',
    title: 'Buket 3',
    category: 'Buketi',
    image: buket9,
    price: '3.499 RSD'
  },
  {
    id: 'bidermajer-1',
    title: 'Bidermajer 1',
    category: 'Bidermajeri',
    image: bidermajer5,
    price: '3.499 RSD'
  },
  {
    id: 'bidermajer-2',
    title: 'Bidermajer 2',
    category: 'Bidermajeri',
    image: bidermajer6,
    price: '3.799 RSD'
  },
  {
    id: 'bidermajer-3',
    title: 'Bidermajer 3',
    category: 'Bidermajeri',
    image: bidermajer7,
    price: '4.099 RSD'
  },
  {
    id: 'aranžman-1',
    title: 'Aranžman 1',
    category: 'Cvetni aranžmani',
    image: cvetni4,
    price: '3.199 RSD'
  },
  {
    id: 'aranžman-2',
    title: 'Aranžman 2',
    category: 'Cvetni aranžmani',
    image: cvetni5,
    price: '3.499 RSD'
  },
  {
    id: 'aranžman-3',
    title: 'Aranžman 3',
    category: 'Cvetni aranžmani',
    image: cvetni8,
    price: '3.799 RSD'
  },
  {
    id: 'saksijsko-1',
    title: 'Saksijsko 1',
    category: 'Saksijsko cveće',
    image: saksijskocvece,
    price: '2.799 RSD'
  },
  {
    id: 'saksijsko-2',
    title: 'Saksijsko 2',
    category: 'Saksijsko cveće',
    image: saksija3,
    price: '2.999 RSD'
  },
  {
    id: 'saksijsko-3',
    title: 'Saksijsko 3',
    category: 'Saksijsko cveće',
    image: saksija8,
    price: '3.199 RSD'
  },
  {
    id: 'poklon-1',
    title: 'Poklon aranžman 1',
    category: 'Poklon aranžmani',
    image: poklonaranzmani,
    price: '4.199 RSD'
  },
  {
    id: 'poklon-2',
    title: 'Poklon aranžman 2',
    category: 'Poklon aranžmani',
    image: poklon3,
    price: '4.499 RSD'
  },
  {
    id: 'poklon-3',
    title: 'Poklon aranžman 3',
    category: 'Poklon aranžmani',
    image: poklon7,
    price: '4.799 RSD'
  },
  {
    id: 'balon-1',
    title: 'Balon 1',
    category: 'Baloni sa helijumom',
    image: baloni,
    price: '1.499 RSD'
  },
  {
    id: 'balon-2',
    title: 'Balon 2',
    category: 'Baloni sa helijumom',
    image: baloni2,
    price: '1.699 RSD'
  },
  {
    id: 'balon-3',
    title: 'Balon 3',
    category: 'Baloni sa helijumom',
    image: baloni4,
    price: '1.899 RSD'
  }
];

function HomeContent({ onSelectPage }) {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-text">
            <p className="eyebrow">Dobro došli u Cvećaru & Gift Shop</p>
            <h1>Bloom</h1>
            <p>
              Sveže cveće, unikatni pokloni i detalji za svaku priliku.
              Pregledajte naš asortiman i naručite brzo i jednostavno.
            </p>
          </div>
          <div className="hero-image">
            <img src={slika_logo} alt="Bloom logo" />
          </div>
        </div>
      </section>

      <section className="featured" id="featured">
        <div className="section-headline">
          <p className="eyebrow">Izdvajamo iz ponude!</p>
          <h2>Najlepši predlozi za vas</h2>
        </div>

        <div className="category-grid">
          {featuredCategories.map((category) => (
            <article
              key={category.title}
              className="category-card"
              onClick={() => onSelectPage && onSelectPage('products')}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-image-wrap">
                <img
                  className="category-image"
                  src={category.image}
                  alt={category.title}
                />
              </div>
              <h3>{category.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ProductsContent() {
  return (
    <section className="products-page">
      <div className="section-headline">
        <p className="eyebrow">Proizvodi</p>
        <h2>Izaberite svoj omiljeni proizvod</h2>
      </div>

      <div className="product-grid">
        {productCards.map((product) => (
          <article key={product.id} className="product-card">
            <div className="category-image-wrap">
              <img
                className="category-image"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="product-body">
              <h3>{product.title}</h3>
              <p className="product-category">{product.category}</p>
              <div className="product-footer">
                <span className="product-price">{product.price}</span>
                <button className="add-to-cart-btn" type="button">
                  Dodaj u korpu
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutContent() {
  return (
    <section className="about-page">
      <div className="section-headline">
        <p className="eyebrow">O nama</p>
        <h2>Ko smo mi</h2>
      </div>

      <div className="about-body">
        <p>
          Bloom je mala porodična cvećara posvećena stvaranju lepih i
          pažljivo aranžiranih buketa za sve prilike. Nudimo sveže cveće,
          unikatne poklone i usluge dostave.
        </p>
        <p>Kompletan asortiman naših proizvoda ćete pronaći u našoj onlajn prodavnici, 
          a osim buketa, cvetnih aranžmana, bidermajera, saksijskog i rezanog cveća, za 
          Vas pravimo i unikatne poklon aranžmane! Nudimo i bogat izbor balona punjenih helijumom!
        </p>
        <p>
          Naš tim kombinuje kreativnost i iskustvo kako bi svaki aranžman
          bio poseban. Hvala što nas podržavate — radujemo se da vam
          pomognemo da obeležite važne trenutke.
        </p>
      </div>

      <h2>Zašto smo pravi izbor</h2>
      <div className="about-body">
        <p>
          Naš tim vredno radi na ispunjavanju Vaših želja i takođe pruža uslugu dostave na 
          kućnu adresu u Novom Sadu i okolini!<br></br>
          Dostavljanje aranžmana se zakazuje blagovremeno ranije, a Vašu porudžbinu možete 
          izvršiti lično u prodavnici, putem telefona ili društvenih mreža. 
          Vaše zadovoljstvo je naše najveće priznanje, 
          te nastojimo da opravdamo Vaše dugogodišnje poverenje i u budućnosti!
        </p>
      </div>
    </section>
  );
}



function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app-shell">
      <Navbar activePage={page} onSelectPage={setPage} />

      <main className="content">
        {page === 'home' && <HomeContent onSelectPage={setPage} />}
        {page === 'products' && <ProductsContent />}
        {page === 'about' && <AboutContent />}
        {page === 'contact' && <Contact />}
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React from 'react';

export default function HomeScreen({ featuredCategories, onSelectPage, logo }) {
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
            <img src={logo} alt="Bloom logo" />
          </div>
        </div>
      </section>

      <section className="featured" id="featured">
        <div className="section-headline">
          <p className="eyebrow">Izdvajamo iz ponude!</p>
          <h2>Najlepši predlozi za Vas</h2>
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

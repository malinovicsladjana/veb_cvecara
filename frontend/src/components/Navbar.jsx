import React from 'react';

const Navbar = () => {
  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-logo">Bloom</div>
          <div className="brand-text">cvecara & gift shop</div>
        </div>

        <nav className="nav-links">
          <a href="#home">Početna</a>
          <a href="#products">Proizvodi</a>
          <a href="#about">O nama</a>
        </nav>

        <a className="cart-link" href="#cart" aria-label="Korpa">
          <span className="cart-icon">🛒</span>
          <span className="cart-text">Korpa</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;

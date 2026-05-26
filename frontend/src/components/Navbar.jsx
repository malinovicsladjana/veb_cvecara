import React from 'react';
import logo from '../slika_logo.jpg';

const Navbar = ({ activePage, onSelectPage, onOpenAuth, cartCount, currentUser, onLogout }) => {
  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-left">
            <img className="brand-image" src={logo} alt="Bloom logo" />
            <div>
              <div className="brand-logo">Bloom</div>
              <div className="brand-text">Cvećara & Gift Shop</div>
            </div>
          </div>
        </div>

        <nav className="nav-links">
          <a
            href="#home"
            className={activePage === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onSelectPage('home');
            }}
          >
            Početna
          </a>
          <a
            href="#products"
            className={activePage === 'products' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onSelectPage('products');
            }}
          >
            Proizvodi
          </a>
          <a
            href="#about"
            className={activePage === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onSelectPage('about');
            }}
          >
            O nama
          </a>
          <a
            href="#contact"
            className={activePage === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onSelectPage('contact');
            }}
          >
            Kontakt
          </a>
          {currentUser?.isAdmin && (
            <a
              href="#admin"
              className={activePage === 'admin' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onSelectPage('admin');
              }}
            >
              Admin
            </a>
          )}
        </nav>

        <div className="navbar-actions">
          {currentUser ? (
            <>
              <span className="navbar-user">Zdravo, {currentUser.firstName}</span>
              <button className="logout-button" type="button" onClick={onLogout}>
                Odjava
              </button>
            </>
          ) : (
            <button className="login-button" type="button" onClick={() => onOpenAuth('login')}>
              Prijava
            </button>
          )}
          <a
            className="cart-link"
            href="#cart"
            aria-label="Korpa"
            onClick={(e) => {
              e.preventDefault();
              onSelectPage('cart');
            }}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Korpa</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

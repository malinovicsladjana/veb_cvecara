import React, { useState, useEffect } from 'react';
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

function ProductsContent({ onAddToCart, isLoggedIn, onOpenAuth, reviews, currentUser, onSubmitRating }) {
  return (
    <section className="products-page">
      <div className="section-headline">
        <p className="eyebrow">Proizvodi</p>
        <h2>Izaberite svoj omiljeni proizvod</h2>
      </div>

      <div className="product-grid">
        {productCards.map((product) => {
          const productReview = reviews[product.id] || { count: 0, total: 0, ratings: {} };
          const averageRating = productReview.count
            ? Math.round(productReview.total / productReview.count)
            : 0;
          const userRating = currentUser ? productReview.ratings[currentUser.email] || 0 : 0;

          return (
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
                  <button
                    className={`add-to-cart-btn ${!isLoggedIn ? 'disabled' : ''}`}
                    type="button"
                    disabled={!isLoggedIn}
                    onClick={() => onAddToCart(product)}
                  >
                    {isLoggedIn ? 'Dodaj u korpu' : 'Prijavite se za korpu'}
                  </button>
                </div>
                {!isLoggedIn && (
                  <div className="cart-login-note">
                    Prijavite se da biste mogli da dodate u korpu i poručujete proizvode.
                  </div>
                )}
                <div className="product-review">
                  <div className="rating-average">
                    {Array.from({ length: 5 }, (_, idx) => (
                      <span
                        key={idx}
                        className={idx < averageRating ? 'filled-star' : 'empty-star'}
                      >
                        ★
                      </span>
                    ))}
                    <span className="rating-count">
                      {productReview.count > 0
                        ? `${averageRating} (${productReview.count})`
                        : 'Nema ocena'}
                    </span>
                  </div>
                  {isLoggedIn ? (
                    <div className="rating-input">
                      <span>Oceni:</span>
                      {Array.from({ length: 5 }, (_, idx) => {
                        const value = idx + 1;
                        return (
                          <button
                            key={value}
                            type="button"
                            className={`star-btn ${userRating >= value ? 'selected' : ''}`}
                            onClick={() => onSubmitRating(product.id, value)}
                          >
                            {userRating >= value ? '★' : '☆'}
                          </button>
                        );
                      })}
                      <span className="rating-note">
                        {userRating ? `Vaša ocena: ${userRating}` : 'Kliknite da ocenite'}
                      </span>
                    </div>
                  ) : (
                    <button
                      className="login-review-btn"
                      type="button"
                      onClick={() => onOpenAuth('login')}
                    >
                      Prijavite se da ostavite recenziju
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CartContent({ cartItems, onRemoveItem, onClearCart, currentUser, onOpenAuth }) {
  if (!currentUser) {
    return (
      <section className="cart-page">
        <div className="section-headline">
          <p className="eyebrow">Korpa</p>
          <h2>Vaša korpa</h2>
        </div>
        <div className="cart-empty">
          Morate se prijaviti da biste videli i poručili proizvode.
          <button className="auth-submit" type="button" onClick={() => onOpenAuth('login')}>
            Prijavite se
          </button>
        </div>
      </section>
    );
  }

  const total = cartItems.reduce((sum, item) => {
    const numericPrice = Number(
      item.price
        .replace(/\./g, '')
        .replace(',', '.')
        .replace(/[^\d.]/g, '')
    );
    return sum + numericPrice * item.quantity;
  }, 0);

  const formattedTotal = total.toLocaleString('sr-RS', {
    minimumFractionDigits: 0,
  });

  return (
    <section className="cart-page">
      <div className="section-headline">
        <p className="eyebrow">Korpa</p>
        <h2>Vaša korpa</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">Korpa je prazna. Dodajte proizvode i vratite se ovde.</div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-body">
                  <h3>{item.title}</h3>
                  <p className="product-category">{item.category}</p>
                  <p>Količina: {item.quantity}</p>
                  <p>Jedinična cena: {item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="clear-cart-btn"
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Ukloni
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              Ukupno: <strong>{formattedTotal} RSD</strong>
            </p>
            <button className="clear-cart-btn" type="button" onClick={onClearCart}>
              Isprazni korpu
            </button>
          </div>
        </>
      )}
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



function AuthForm({ mode, onSwitchMode, onClose, onLogin, onRegister }) {
  const isLogin = mode === 'login';
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    setValues({ firstName: '', lastName: '', email: '', password: '' });
    setErrors({});
    setMessage('');
    setSubmitResult(null);
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setMessage('');
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = 'Email je obavezan.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Unesite validan email.';
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Lozinka je obavezna.';
    } else if (values.password.length < 6) {
      nextErrors.password = 'Lozinka mora imati bar 6 karaktera.';
    }

    if (!isLogin) {
      if (!values.firstName.trim()) {
        nextErrors.firstName = 'Ime je obavezno.';
      }
      if (!values.lastName.trim()) {
        nextErrors.lastName = 'Prezime je obavezno.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setMessage('Popunite sva označena polja kako biste nastavili.');
      return;
    }

    const normalizedEmail = values.email.trim().toLowerCase();
    const credentials = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: normalizedEmail,
      password: values.password,
    };

    const result = isLogin
      ? onLogin(normalizedEmail, credentials.password)
      : onRegister(credentials.firstName, credentials.lastName, normalizedEmail, credentials.password);

    setSubmitResult(result);
    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <section className="auth-overlay" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" type="button" onClick={onClose} aria-label="Zatvori">
          ×
        </button>
        <h2>{isLogin ? 'Prijava' : 'Registracija'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-row">
              <label>
                Ime
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  placeholder="Unesite ime"
                  onChange={handleChange}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </label>
              <label>
                Prezime
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  placeholder="Unesite prezime"
                  onChange={handleChange}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </label>
            </div>
          )}

          <label className="form-row-single">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="Unesite email"
              onChange={handleChange}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>
          <label className="form-row-single">
            Lozinka
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="Unesite lozinku"
              onChange={handleChange}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </label>
          <button className="auth-submit" type="submit">
            {isLogin ? 'Prijavite se' : 'Registrujte se'}
          </button>
          {message && (
            <div className={`auth-message ${submitResult && !submitResult.success ? 'auth-error' : 'auth-success'}`}>
              {message}
            </div>
          )}
        </form>
        <p className="auth-switch">
          {isLogin ? 'Nemate nalog?' : 'Već imate nalog?'}{' '}
          <button type="button" onClick={() => onSwitchMode(isLogin ? 'register' : 'login')}>
            {isLogin ? 'Registrujte se.' : 'Prijavite se.'}
          </button>
        </p>
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [authMode, setAuthMode] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [reviews, setReviews] = useState({});

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isLoggedIn = Boolean(currentUser);

  const handleLogin = (email, password) => {
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
      return { success: false, message: 'Email ili lozinka nisu tačni.' };
    }

    setCurrentUser(user);
    return { success: true, message: 'Uspešno ste se prijavili.' };
  };

  const handleRegister = (firstName, lastName, email, password) => {
    const normalizedEmail = email.toLowerCase();

    if (users.some((item) => item.email === normalizedEmail)) {
      return { success: false, message: 'Email je već registrovan.' };
    }

    const newUser = {
      firstName,
      lastName,
      email: normalizedEmail,
      password,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    return { success: true, message: 'Uspešno ste se registrovali.' };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('home');
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setAuthMode('login');
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
    setPage('cart');
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmitRating = (productId, rating) => {
    if (!isLoggedIn) {
      setAuthMode('login');
      return;
    }

    setReviews((prev) => {
      const currentReviews = prev[productId] || { count: 0, total: 0, ratings: {} };
      const existingRating = currentReviews.ratings[currentUser.email] || 0;
      const count = existingRating ? currentReviews.count : currentReviews.count + 1;
      const total = existingRating
        ? currentReviews.total - existingRating + rating
        : currentReviews.total + rating;

      return {
        ...prev,
        [productId]: {
          count,
          total,
          ratings: {
            ...currentReviews.ratings,
            [currentUser.email]: rating,
          },
        },
      };
    });
  };

  return (
    <div className="app-shell">
      <Navbar
        activePage={page}
        onSelectPage={setPage}
        onOpenAuth={setAuthMode}
        cartCount={cartCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="content">
        {page === 'home' && <HomeContent onSelectPage={setPage} />}
        {page === 'products' && (
          <ProductsContent
            onAddToCart={handleAddToCart}
            isLoggedIn={isLoggedIn}
            onOpenAuth={setAuthMode}
            reviews={reviews}
            currentUser={currentUser}
            onSubmitRating={handleSubmitRating}
          />
        )}
        {page === 'about' && <AboutContent />}
        {page === 'contact' && <Contact />}
        {page === 'cart' && (
          <CartContent
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            currentUser={currentUser}
            onOpenAuth={setAuthMode}
          />
        )}
        {authMode && (
          <AuthForm
            mode={authMode}
            onSwitchMode={setAuthMode}
            onClose={() => setAuthMode(null)}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

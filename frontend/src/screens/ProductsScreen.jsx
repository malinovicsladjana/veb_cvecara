import React, { useState } from 'react';

export default function ProductsScreen({ onAddToCart, isLoggedIn, onOpenAuth, reviews, currentUser, onSubmitRating, products }) {
  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (id, value) => {
    const qty = Math.max(1, Number(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  return (
    <section className="products-page">
      <div className="section-headline">
        <p className="eyebrow">Proizvodi</p>
        <h2>Izaberite svoj omiljeni proizvod</h2>
      </div>

      <div className="product-grid">
        {products.map((product) => {
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
                  <div className="qty-and-add">
                    <label className="qty-label">
                      Količina (max 5)
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQtyChange(product.id, e.target.value)}
                        className="qty-input"
                      />
                    </label>
                    <button
                      className={`add-to-cart-btn ${!isLoggedIn || !product.inStock ? 'disabled' : ''}`}
                      type="button"
                      disabled={!isLoggedIn || !product.inStock}
                      onClick={() => onAddToCart(product, quantities[product.id] || 1)}
                    >
                      {product.inStock
                        ? isLoggedIn
                          ? 'Dodaj u korpu'
                          : 'Prijavite se za korpu'
                        : 'Nije na stanju'}
                    </button>
                  </div>
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

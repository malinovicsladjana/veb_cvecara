import React from 'react';

export default function CartScreen({ cartItems, onRemoveItem, onClearCart, currentUser, onOpenAuth, onChoosePayment, isChoosingPayment, onConfirmPayment, onCancelPayment, checkoutMessage }) {
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
            <div className="cart-summary-actions">
              <button className="clear-cart-btn" type="button" onClick={onClearCart}>
                Isprazni korpu
              </button>
              {currentUser && (
                isChoosingPayment ? (
                  <div className="payment-method-box">
                    <p>Izaberite način plaćanja:</p>
                    <div className="payment-method-buttons">
                      <button className="auth-submit" type="button" onClick={() => onConfirmPayment('pouzece')}>
                        Pouzećem
                      </button>
                      <button className="auth-submit" type="button" onClick={() => onConfirmPayment('paypal')}>
                        PayPal
                      </button>
                      <button className="clear-cart-btn" type="button" onClick={onCancelPayment}>
                        Otkaži
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="auth-submit" type="button" onClick={onChoosePayment}>
                    Poruči
                  </button>
                )
              )}
            </div>
            {checkoutMessage && <div className="auth-message auth-success">{checkoutMessage}</div>}
          </div>
        </>
      )}
    </section>
  );
}

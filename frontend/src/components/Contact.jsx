import React from 'react';

const defaultContactValues = {
  firstName: '',
  lastName: '',
  deliveryAddress: '',
  phone: '',
  email: '',
  note: '',
  deliveryTime: '2',
  paymentMethod: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: '',
};

const Contact = ({ contactValues = defaultContactValues, onContactChange }) => {
  const formState = { ...defaultContactValues, ...contactValues };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onContactChange?.({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.deliveryAddress ||
      !formState.phone ||
      !formState.email ||
      !formState.deliveryTime
    ) {
      return;
    }

    if (formState.paymentMethod === 'paypal') {
      // basic card validation
      const cardNum = (formState.cardNumber || '').replace(/\s+/g, '');
      const cvc = (formState.cardCVC || '').trim();
      const expiry = (formState.cardExpiry || '').trim();

      if (!/^[0-9]{13,19}$/.test(cardNum)) {
        alert('Unesite validan broj kartice (13-19 cifara).');
        return;
      }

      if (!/^[0-9]{3,4}$/.test(cvc)) {
        alert('Unesite validan CVC (3 ili 4 cifre).');
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/(?:[0-9]{2}|[0-9]{4})$/.test(expiry)) {
        alert('Unesite datum isteka u formatu MM/YY ili MM/YYYY.');
        return;
      }
    }

    alert('Hvala Vam, Vaša porudžbina je uspešno primljena!');
    onContactChange?.({
      ...defaultContactValues,
    });
  };

  return (
    <section className="contact-page">
      <div className="section-headline">
        <p className="eyebrow">Kontakt</p>
        <h2>Budite u kontaktu sa nama</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Za sve Vaše želje na raspolaganju su Vam fizička i virtuelna prodavnica!</h3>
          <div className="contact-list">
            <div>
              <strong>Adresa</strong>
              <p>Bulevar Kralja Petra I 12, Novi Sad</p>
            </div>
            <div>
              <strong>Radno vreme</strong>
              <p>Pon-Pet: 08:00 - 20:00</p>
              <p>Sub: 09:00 - 15:00</p>
            </div>
            <div>
              <strong>Telefon</strong>
              <p>+381 21 123 456</p>
            </div>
            <div>
              <strong>Email</strong>
              <p>info@bloomcvecara.rs</p>
            </div>
            <div>
              <strong>Facebook</strong>
              <p>@BloomCvecara</p>
            </div>
            <div>
              <strong>Instagram</strong>
              <p>@BloomCvecara</p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>Pošaljite nam poruku</h3>
          {formState.paymentMethod && (
            <div className="payment-note">
              Izabrali ste plaćanje <strong>{formState.paymentMethod === 'paypal' ? 'PayPal' : 'pouzećem'}</strong>. Popunite detalje za dostavu.
            </div>
          )}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Ime
                <input
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Prezime
                <input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <label className="form-row-single">
              Adresa dostave
              <input
                type="text"
                name="deliveryAddress"
                value={formState.deliveryAddress}
                onChange={handleInputChange}
                required
              />
            </label>

            <div className="form-row">
              <label>
                Telefon
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            {formState.paymentMethod === 'paypal' && (
              <div className="card-details">
                <h4>Podaci o kartici (samo demo)</h4>
                <label>
                  Broj kartice
                  <input
                    type="text"
                    name="cardNumber"
                    value={formState.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Bez razmaka"
                  />
                </label>
                <div className="form-row">
                  <label>
                    Ističe (MM/YY)
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formState.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                    />
                  </label>
                  <label>
                    CVC
                    <input
                      type="text"
                      name="cardCVC"
                      value={formState.cardCVC}
                      onChange={handleInputChange}
                      placeholder="CVC"
                    />
                  </label>
                </div>
              </div>
            )}

            <label className="form-row-single">
              Napomena (nije obavezno)
              <textarea
                name="note"
                value={formState.note}
                onChange={handleInputChange}
                placeholder="Ostavite dodatnu poruku ili zahtev"
              />
            </label>

            <fieldset className="radio-group">
              <legend>Izaberite vreme dostave</legend>
              <label className="radio-label">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="2"
                  checked={formState.deliveryTime === '2'}
                  onChange={handleInputChange}
                />
                2 dana
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="3"
                  checked={formState.deliveryTime === '3'}
                  onChange={handleInputChange}
                />
                3 dana
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="4"
                  checked={formState.deliveryTime === '4'}
                  onChange={handleInputChange}
                />
                4 dana
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="5"
                  checked={formState.deliveryTime === '5'}
                  onChange={handleInputChange}
                />
                5 dana
              </label>
            </fieldset>

            <button type="submit">Pošalji</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

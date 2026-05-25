import React, { useState } from 'react';

const Contact = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    deliveryAddress: '',
    phone: '',
    email: '',
    note: '',
    deliveryTime: '2'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
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

    alert('Hvala Vam, Vaša porudžbina je uspešno primljena!');
    setFormState({
      firstName: '',
      lastName: '',
      deliveryAddress: '',
      phone: '',
      email: '',
      note: '',
      deliveryTime: '2'
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

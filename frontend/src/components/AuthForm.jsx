import React, { useState, useEffect } from 'react';

export default function AuthForm({ mode, onSwitchMode, onClose, onLogin, onRegister }) {
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

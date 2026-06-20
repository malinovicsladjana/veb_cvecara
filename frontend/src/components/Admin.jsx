import React, { useState } from 'react';

const Admin = ({ products, orders, users, onCreateProduct, onUpdateProduct, onDeleteProduct, onUpdateOrderStatus }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    price: '',
    image: '',
    inStock: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  const startEditing = (product) => {
    setEditingId(product.id);
    setEditedProduct(product);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedProduct(null);
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    if (!newProduct.title || !newProduct.category || !newProduct.price) {
      return;
    }

    onCreateProduct(newProduct);
    setNewProduct({ title: '', category: '', price: '', image: '', inStock: true });
  };

  const handleEditingSave = (event) => {
    event.preventDefault();
    if (!editedProduct.title || !editedProduct.category || !editedProduct.price) {
      return;
    }

    onUpdateProduct(editedProduct);
    cancelEditing();
  };

  const handleDeleteProductConfirm = (productId) => {
    if (window.confirm('Da li ste sigurni da želite obrisati ovaj proizvod?')) {
      onDeleteProduct(productId);
    }
  };

  const handleDeliverOrder = (order) => {
    if (order.status === 'Završeno') return;

    if (window.confirm('Označite ovu narudžbinu kao isporučenu?')) {
      onUpdateOrderStatus(order.id);
    }
  };

  return (
    <section className="admin-dashboard">
      <div className="section-headline">
        <p className="eyebrow">Admin</p>
        <h2>Administratorski panel</h2>
      </div>

      <div className="admin-grid">
        <div className="admin-section admin-products">
          <div className="admin-section-head">
            <h3>Upravljanje proizvodima</h3>
            <p>Dodajte, izmenite ili uklonite proizvode iz kolekcije.</p>
          </div>

          <form className="admin-form" onSubmit={handleCreateSubmit}>
            <div className="admin-form-row">
              <label>
                Naziv
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                />
              </label>
              <label>
                Kategorija
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </label>
            </div>
            <div className="admin-form-row">
              <label>
                Cena
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </label>
              <label>
                Slika (URL)
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
              </label>
            </div>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={newProduct.inStock}
                onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
              />
              Dostupno na stanju
            </label>
            <button type="submit" className="auth-submit">
              Dodaj proizvod
            </button>
          </form>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Proizvod</th>
                  <th>Kategorija</th>
                  <th>Cena</th>
                  <th>Stanje</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {editingId === product.id ? (
                        <input
                          value={editedProduct?.title || ''}
                          onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                        />
                      ) : (
                        product.title
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          value={editedProduct?.category || ''}
                          onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                        />
                      ) : (
                        product.category
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          value={editedProduct?.price || ''}
                          onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                        />
                      ) : (
                        product.price
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <label className="admin-checkbox small-checkbox">
                          <input
                            type="checkbox"
                            checked={editedProduct?.inStock || false}
                            onChange={(e) => setEditedProduct({ ...editedProduct, inStock: e.target.checked })}
                          />
                          Da
                        </label>
                      ) : (
                        <div className="stock-inline">
                          <span>{product.inStock ? 'Da' : 'Ne'}</span>
                          <button
                            type="button"
                            className="admin-action-btn"
                            onClick={() => onUpdateProduct({ ...product, inStock: !product.inStock })}
                            style={{ marginLeft: 8 }}
                          >
                            Promeni
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="admin-actions-cell">
                      {editingId === product.id ? (
                        <>
                          <button className="admin-action-btn" onClick={handleEditingSave}>
                            Sačuvaj
                          </button>
                          <button className="admin-action-btn admin-action-cancel" onClick={cancelEditing}>
                            Otkaži
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="admin-action-btn" onClick={() => startEditing(product)}>
                            Izmeni
                          </button>
                          <button className="admin-action-btn admin-action-delete" onClick={() => handleDeleteProductConfirm(product.id)}>
                            Obriši
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-section admin-orders">
          <div className="admin-section-head">
            <h3>Upravljanje porudžbinama</h3>
            <p>Pregledajte narudžbine i promenite njihov status.</p>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Korisnik</th>
                  <th>Ukupno</th>
                  <th>Status</th>
                  <th>Datum</th>
                  <th>Akcija</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6">Nema novih porudžbina.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.userEmail}</td>
                      <td>{order.total} RSD</td>
                      <td>
                        <span className={`status-tag status-${order.status.replace(/\s/g, '-').toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <button
                          className="admin-action-btn"
                          disabled={order.status === 'Završeno'}
                          onClick={() => handleDeliverOrder(order)}
                        >
                          {order.status === 'Završeno' ? 'Završeno' : 'Označi kao isporučeno'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-section admin-users">
          <div className="admin-section-head">
            <h3>Pregled korisnika</h3>
            <p>Brzi pregled svih registrovanih korisnika.</p>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Email</th>
                  <th>Administrator</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Da' : 'Ne'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;

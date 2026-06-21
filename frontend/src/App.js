import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Admin from './components/Admin';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import AboutScreen from './screens/AboutScreen';
import AuthForm from './components/AuthForm';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './slices/authSlice';
import { addToCart, removeFromCart, clearCart } from './slices/cartSlice';
import { setProducts } from './slices/productsSlice';
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from './slices/productsApiSlice';
import { useCreateOrderMutation, useGetOrdersQuery, useGetPaypalClientIdQuery, usePayOrderMutation, useDeliverOrderMutation } from './slices/ordersApiSlice';
import { useAuth } from './hooks/useAuth';

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
];//lista kategorija koje se izdvajaju na početnoj strani

const productCards = [ // lista proizvoda koji se prikazuju na stranici proizvoda
  {
    id: 'buket-1',
    title: 'Buket 1',
    category: 'Buketi',
    image: buket4,
    price: '2.999 RSD',
    inStock: true,
  },
  {
    id: 'buket-2',
    title: 'Buket 2',
    category: 'Buketi',
    image: buket6,
    price: '3.299 RSD',
    inStock: false,
  },
  {
    id: 'buket-3',
    title: 'Buket 3',
    category: 'Buketi',
    image: buket9,
    price: '3.499 RSD',
    inStock: true,
  },
  {
    id: 'bidermajer-1',
    title: 'Bidermajer 1',
    category: 'Bidermajeri',
    image: bidermajer5,
    price: '3.499 RSD',
    inStock: false,
  },
  {
    id: 'bidermajer-2',
    title: 'Bidermajer 2',
    category: 'Bidermajeri',
    image: bidermajer6,
    price: '3.799 RSD',
    inStock: true,
  },
  {
    id: 'bidermajer-3',
    title: 'Bidermajer 3',
    category: 'Bidermajeri',
    image: bidermajer7,
    price: '4.099 RSD',
    inStock: false,
  },
  {
    id: 'aranžman-1',
    title: 'Aranžman 1',
    category: 'Cvetni aranžmani',
    image: cvetni4,
    price: '3.199 RSD',
    inStock: true,
  },
  {
    id: 'aranžman-2',
    title: 'Aranžman 2',
    category: 'Cvetni aranžmani',
    image: cvetni5,
    price: '3.499 RSD',
    inStock: false,
  },
  {
    id: 'aranžman-3',
    title: 'Aranžman 3',
    category: 'Cvetni aranžmani',
    image: cvetni8,
    price: '3.799 RSD',
    inStock: true,
  },
  {
    id: 'saksijsko-1',
    title: 'Saksijsko 1',
    category: 'Saksijsko cveće',
    image: saksijskocvece,
    price: '2.799 RSD',
    inStock: false,
  },
  {
    id: 'saksijsko-2',
    title: 'Saksijsko 2',
    category: 'Saksijsko cveće',
    image: saksija3,
    price: '2.999 RSD',
    inStock: true,
  },
  {
    id: 'saksijsko-3',
    title: 'Saksijsko 3',
    category: 'Saksijsko cveće',
    image: saksija8,
    price: '3.199 RSD',
    inStock: false,
  },
  {
    id: 'poklon-1',
    title: 'Poklon aranžman 1',
    category: 'Poklon aranžmani',
    image: poklonaranzmani,
    price: '4.199 RSD',
    inStock: true,
  },
  {
    id: 'poklon-2',
    title: 'Poklon aranžman 2',
    category: 'Poklon aranžmani',
    image: poklon3,
    price: '4.499 RSD',
    inStock: false,
  },
  {
    id: 'poklon-3',
    title: 'Poklon aranžman 3',
    category: 'Poklon aranžmani',
    image: poklon7,
    price: '4.799 RSD',
    inStock: true,
  },
  {
    id: 'balon-1',
    title: 'Balon 1',
    category: 'Baloni sa helijumom',
    image: baloni,
    price: '1.499 RSD',
    inStock: false,
  },
  {
    id: 'balon-2',
    title: 'Balon 2',
    category: 'Baloni sa helijumom',
    image: baloni2,
    price: '1.699 RSD',
    inStock: true,
  },
  {
    id: 'balon-3',
    title: 'Balon 3',
    category: 'Baloni sa helijumom',
    image: baloni4,
    price: '1.899 RSD',
    inStock: false,
  }
];



function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products.products);
  const [page, setPage] = useState('home');
  const [authMode, setAuthMode] = useState(null);
  const [users] = useState([
    {
      firstName: 'Admin',
      lastName: 'Bloom',
      email: 'admin@admin.com',
      password: 'admin123',
      isAdmin: true,
    },
  ]);
  const [reviews, setReviews] = useState({});
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [isChoosingPayment, setIsChoosingPayment] = useState(false);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
  const [paypalStatus, setPaypalStatus] = useState('');
  const [paypalError, setPaypalError] = useState('');
  const [contactValues, setContactValues] = useState({
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
  });

  const { data: productsData } = useGetProductsQuery();
  const { data: ordersData } = useGetOrdersQuery(undefined, { skip: !currentUser?.isAdmin });
  const displayedOrders = ordersData || [];

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      dispatch(setProducts(productsData));
    } else if (products.length === 0) {
      dispatch(setProducts(productCards));
    }
  }, [dispatch, productsData, products.length]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isLoggedIn = Boolean(currentUser);

  const { loginUser, registerUser } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      const res = await loginUser(email, password);
      if (res.success) setPage('home');
      return res;
    } catch (err) {
      return { success: false, message: err?.data?.message || err?.message || 'Greška pri prijavi' };
    }
  };

  const handleRegister = async (firstName, lastName, email, password) => {
    try {
      const res = await registerUser(firstName, lastName, email, password);
      return res;
    } catch (err) {
      return { success: false, message: err?.data?.message || err?.message || 'Greška pri registraciji' };
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setPage('home');
  };

  const handleAddToCart = (product, qty = 1) => {
    if (!isLoggedIn) {
      setAuthMode('login');
      return;
    }

    if (!product.inStock) {
      return;
    }

    const quantityToAdd = Math.max(1, Math.min(5, Number(qty) || 1));
    const cartItem = { ...product, quantity: quantityToAdd };

    dispatch(addToCart(cartItem));
    setPage('cart');
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = (paymentMethod) => {
    if (!currentUser || cartItems.length === 0) {
      return;
    }

    if (!paymentMethod) {
      setIsChoosingPayment(true);
      setCheckoutMessage('');
      return;
    }

    const nextContactValues = {
      ...contactValues,
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      note: `Izabrali ste ${
        paymentMethod === 'paypal' ? 'PayPal' : 'pouzećem'
      } kao način plaćanja.`,
      paymentMethod,
    };

    setContactValues(nextContactValues);
    setIsChoosingPayment(false);
    setCheckoutMessage(
      `Molimo potvrdite vaše podatke u kontakt formi za plaćanje ${
        paymentMethod === 'paypal' ? 'PayPal' : 'pouzećem'
      }.`
    );
    setPage('contact');
  };

  const handleContactChange = (update) => {
    setContactValues((prev) => ({ ...prev, ...update }));
  };

  const handleCancelPayment = () => {
    setIsChoosingPayment(false);
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

  const handleCreateProduct = async (newProduct) => {
    try {
      await createProductApi({
        name: newProduct.title,
        category: newProduct.category,
        image: newProduct.image || '/images/sample.jpg',
        price: Number(String(newProduct.price).replace(/[^\d.-]/g, '')) || 0,
        countInStock: newProduct.inStock ? 1 : 0,
        description: newProduct.description || '',
      }).unwrap();
    } catch (err) {
      console.error('Greška pri kreiranju proizvoda', err);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProductApi({
        productId: updatedProduct.id,
        data: {
          name: updatedProduct.title,
          category: updatedProduct.category,
          image: updatedProduct.image || '/images/sample.jpg',
          price: Number(String(updatedProduct.price).replace(/[^\d.-]/g, '')) || 0,
          countInStock: updatedProduct.inStock ? 1 : 0,
          description: updatedProduct.description || '',
        },
      }).unwrap();
    } catch (err) {
      console.error('Greška pri izmeni proizvoda', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductApi(productId).unwrap();
    } catch (err) {
      console.error('Greška pri brisanju proizvoda', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      await deliverOrder(orderId).unwrap();
    } catch (err) {
      console.error('Greška prilikom isporuke narudžbine', err);
    }
  };

  const [createProductApi] = useCreateProductMutation();
  const [updateProductApi] = useUpdateProductMutation();
  const [deleteProductApi] = useDeleteProductMutation();
  const [deliverOrder] = useDeliverOrderMutation();
  const [createOrder] = useCreateOrderMutation();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { data: paypalConfig, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery(undefined, { skip: !pendingPaymentOrder });

  const handleSubmitOrder = async (orderInfo) => {
    if (!currentUser || cartItems.length === 0) return;

    const orderItems = cartItems.map((item) => ({
      name: item.title || item.name,
      qty: item.quantity,
      image: item.image,
      price: Number(String(item.price).replace(/[^\d.-]/g, '')) || 0,
      product: item.id,
    }));

    const payload = {
      orderItems,
      shippingAddress: orderInfo.shippingAddress,
      paymentMethod: orderInfo.paymentMethod,
      itemsPrice: orderItems.reduce((s, it) => s + it.price * it.qty, 0),
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: orderItems.reduce((s, it) => s + it.price * it.qty, 0),
    };

    try {
      const res = await createOrder(payload).unwrap();

      if (orderInfo.paymentMethod === 'paypal') {
        setPendingPaymentOrder(res);
        setPaypalStatus('Porudžbina je kreirana. Nastavite sa plaćanjem preko PayPal-a.');
        setPaypalError('');
        return res;
      }

      dispatch(clearCart());
      setCheckoutMessage('Porudžbina je uspešno kreirana.');
      setPage('home');
      return res;
    } catch (err) {
      setCheckoutMessage('Greška pri kreiranju porudžbine.');
      return null;
    }
  };

  useEffect(() => {
    if (!pendingPaymentOrder) return;

    if (errorPayPal) {
      setPaypalError('PayPal nije dostupan. Proverite konfiguraciju.');
      return;
    }

    if (!loadingPayPal && paypalConfig?.clientId) {
      setPaypalError('');
    }
  }, [pendingPaymentOrder, paypalConfig, errorPayPal, loadingPayPal]);

  const handlePayPalError = (error) => {
    console.error('PayPal greška:', error);
    setPaypalError('Greška prilikom PayPal plaćanja. Pokušajte ponovo.');
  };

  const createPayPalOrder = (data, actions) => {
    const amountEUR = ((pendingPaymentOrder?.totalPrice || 0) / 117.2).toFixed(2);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amountEUR,
          },
        },
      ],
    });
  };

  const handlePayPalApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      await payOrder({ orderId: pendingPaymentOrder._id, paymentResult: details }).unwrap();
      dispatch(clearCart());
      setCheckoutMessage('Porudžbina je uspešno plaćena putem PayPal-a.');
      setPaypalStatus('');
      setPendingPaymentOrder(null);
      setPage('home');
    } catch (err) {
      setPaypalError('Greška prilikom završetka PayPal plaćanja.');
      console.error(err);
    }
  };

  const handlePayPalCancel = () => {
    setPaypalStatus('PayPal plaćanje je otkazano.');
  };

  const handlePayPalFailed = () => {
    setPaypalError('PayPal plaćanje nije uspelo.');
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
        {page === 'home' && <HomeScreen featuredCategories={featuredCategories} onSelectPage={setPage} logo={slika_logo} />}
        {page === 'products' && (
          <ProductsScreen
            onAddToCart={handleAddToCart}
            isLoggedIn={isLoggedIn}
            onOpenAuth={setAuthMode}
            reviews={reviews}
            currentUser={currentUser}
            onSubmitRating={handleSubmitRating}
            products={products}
          />
        )}
        {page === 'about' && <AboutScreen />}
        {page === 'contact' && (
          <>
            <Contact
              contactValues={contactValues}
              onContactChange={handleContactChange}
              onSubmitOrder={handleSubmitOrder}
              isSubmitDisabled={Boolean(pendingPaymentOrder)}
            />
            {pendingPaymentOrder && (
              <section className="paypal-payment-section">
                <div className="section-headline">
                  <p className="eyebrow">PayPal</p>
                  <h2>Plaćanje narudžbine</h2>
                </div>
                {paypalError && <div className="auth-message auth-error">{paypalError}</div>}
                {paypalStatus && <div className="auth-message auth-success">{paypalStatus}</div>}
                {!paypalConfig?.clientId && !loadingPayPal && !paypalError && (
                  <div className="auth-message auth-error">
                    PayPal client ID nije podešen. Plaćanje putem PayPal-a nije dostupno.
                  </div>
                )}
                {paypalConfig?.clientId && (
                  <div className="paypal-buttons-wrapper">
                    <PayPalScriptProvider options={{ 'client-id': paypalConfig.clientId, currency: 'EUR' }}>
                      <PayPalButtons
                        createOrder={createPayPalOrder}
                        onApprove={handlePayPalApprove}
                        onCancel={handlePayPalCancel}
                        onError={handlePayPalError}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
              </section>
            )}
          </>
        )}
        {page === 'cart' && (
          <CartScreen
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            currentUser={currentUser}
            onOpenAuth={setAuthMode}
            onChoosePayment={() => setIsChoosingPayment(true)}
            isChoosingPayment={isChoosingPayment}
            onConfirmPayment={handleCheckout}
            onCancelPayment={handleCancelPayment}
            checkoutMessage={checkoutMessage}
          />
        )}
        {page === 'admin' && currentUser?.isAdmin && (
          <Admin
            products={products}
            orders={displayedOrders}
            users={users}
            onCreateProduct={handleCreateProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
        {page === 'admin' && !currentUser?.isAdmin && (
          <section className="admin-unauthorized">
            <h2>Nemate ovlašćenja za pristup administratorskom delu.</h2>
            <p>Prijavite se kao administrator da biste nastavili.</p>
          </section>
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

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API je pokrenut');
});

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID || '' });
});
app.get('/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID || '' });
});

// Alias routes for clients that send requests without /api prefix
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server je pokrenut na portu ${PORT}`);
  });
};

startServer();

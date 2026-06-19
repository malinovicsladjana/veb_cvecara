const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API je pokrenut');
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server je pokrenut na portu ${PORT}`);
  });
};

startServer();

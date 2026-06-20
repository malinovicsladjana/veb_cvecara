const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const products = require('./data/products');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Product seed podaci su ubaceni');
    process.exit();
  } catch (error) {
    console.error(`Seed greska: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();

    console.log('Product podaci su obrisani');
    process.exit();
  } catch (error) {
    console.error(`Seed greska: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

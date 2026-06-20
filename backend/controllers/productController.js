const Product = require('../models/productModel');
const asyncHandler = require('../middleware/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Proizvod nije pronadjen');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name || 'Novi proizvod',
    image: req.body.image || '/images/sample.jpg',
    category: req.body.category || 'Buketi',
    description: req.body.description || 'Opis proizvoda',
    price: req.body.price || 0,
    countInStock: req.body.countInStock || 0,
    rating: req.body.rating || 0,
    numReviews: req.body.numReviews || 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    category,
    description,
    price,
    countInStock,
    rating,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name ?? product.name;
    product.image = image ?? product.image;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.countInStock = countInStock ?? product.countInStock;
    product.rating = rating ?? product.rating;
    product.numReviews = numReviews ?? product.numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Proizvod nije pronadjen');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Proizvod je obrisan' });
  } else {
    res.status(404);
    throw new Error('Proizvod nije pronadjen');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

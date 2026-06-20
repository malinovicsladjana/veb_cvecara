const Order = require('../models/orderModel');
const asyncHandler = require('../middleware/asyncHandler');

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('Nema proizvoda u narudzbini');
  }

  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item.product || item._id || item.id,
    })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    const isOwner = order.user._id.toString() === req.user._id.toString();

    if (isOwner || req.user.isAdmin) {
      res.json(order);
    } else {
      res.status(401);
      throw new Error('Niste autorizovani za ovu narudzbinu');
    }
  } else {
    res.status(404);
    throw new Error('Narudzbina nije pronadjena');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id || req.body.paymentResult?.id,
      status: req.body.status || req.body.paymentResult?.status,
      updateTime:
        req.body.updateTime ||
        req.body.paymentResult?.update_time ||
        req.body.paymentResult?.updateTime,
      emailAddress:
        req.body.emailAddress ||
        req.body.paymentResult?.emailAddress ||
        req.body.paymentResult?.payer?.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Narudzbina nije pronadjena');
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Narudzbina nije pronadjena');
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email');
  res.json(orders);
});

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};

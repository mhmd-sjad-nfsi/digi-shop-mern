import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('هیچ آیتمی در سفارش وجود ندارد');
  } else {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id, // شناسه محصول را به فیلد product منتقل می‌کنیم
        _id: undefined // _id آیتم سبد خرید را حذف می‌کنیم تا MongoDB شناسه جدید بسازد
      })),
      user: req.user._id, // کاربر لاگین کرده از میان‌افزار protect
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
  // @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // با استفاده از populate، نام و ایمیل کاربر مربوط به این سفارش را هم دریافت می‌کنیم
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('سفارش یافت نشد');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // در یک سناریوی واقعی، اطلاعات پرداخت از req.body گرفته می‌شود
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('سفارش یافت نشد');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // با populate، از طریق user id، نام کاربر را هم از کالکشن User دریافت می‌کنیم
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('سفارش یافت نشد');
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders,getOrders,updateOrderToDelivered };
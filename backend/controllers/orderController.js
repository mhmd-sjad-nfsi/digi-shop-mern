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

export { addOrderItems, getOrderById };
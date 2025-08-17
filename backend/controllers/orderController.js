import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import axios from 'axios';
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

// @desc    Update order to paid (Request Payment from Zarinpal)
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.isPaid) {
      res.status(400);
      throw new Error('این سفارش قبلاً پرداخت شده است');
    }

    const amount = Math.round(order.totalPrice); // مبلغ به تومان
    const description = `پرداخت سفارش شماره ${order._id}`;
    // این آدرس، اندپوینتی در بک‌اند ماست که زرین‌پال کاربر را به آن برمی‌گرداند
    const callback_url = `http://localhost:5000/api/orders/verify-payment`;

    const zarinpal_request_url = 'https://sandbox.zarinpal.com/pg/v4/payment/request.json';

    try {
      const { data } = await axios.post(zarinpal_request_url, {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: amount,
        currency: "IRT", // واحد پولی تومان
        description,
        callback_url,
        metadata: { order_id: order._id.toString() },
      });

      if (data.data.code === 100 && data.data.authority) {
        // authority را در دیتابیس ذخیره می‌کنیم تا در مرحله اعتبارسنجی از آن استفاده کنیم
        order.paymentResult = { authority: data.data.authority };
        await order.save();
        // لینک درگاه پرداخت را به فرانت‌اند ارسال می‌کنیم
        res.json({ url: `https://sandbox.zarinpal.com/pg/StartPay/${data.data.authority}` });
      } else {
        res.status(400);
        throw new Error('خطا در ارتباط با درگاه پرداخت');
      }
    } catch (error) {
      console.error(error);
      res.status(500);
      throw new Error('خطای سرور درگاه پرداخت');
    }
  } else {
    res.status(404);
    throw new Error('سفارش یافت نشد');
  }
});

// @desc    Verify payment from Zarinpal
// @route   GET /api/orders/verify-payment
// @access  Public
const verifyPayment = asyncHandler(async (req, res) => {
  const { Authority, Status } = req.query;
  const zarinpal_verify_url = 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json';

  // سفارش را بر اساس authority که از زرین‌پال برگشته پیدا می‌کنیم
  const order = await Order.findOne({ 'paymentResult.authority': Authority });

  if (!order) {
    // اگر سفارشی پیدا نشد، کاربر را به یک صفحه خطا در فرانت‌اند هدایت می‌کنیم
    return res.redirect(`${process.env.FRONTEND_URL}/payment-error?message=Order_Not_Found`);
  }
  
  // اگر پرداخت ناموفق بود یا کاربر انصراف داده بود
  if (Status !== 'OK') {
    return res.redirect(`${process.env.FRONTEND_URL}/order/${order._id}?error=payment_cancelled`);
  }

  const amount = Math.round(order.totalPrice); // مبلغ به تومان

  try {
    const { data } = await axios.post(zarinpal_verify_url, {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      authority: Authority,
      amount,
      currency: "IRT",
    });

    if (data.data.code === 100 || data.data.code === 101) { // 101: تراکنش قبلا وریفای شده
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: data.data.ref_id, // شماره پیگیری زرین‌پال
        status: 'completed',
        update_time: new Date().toISOString(),
        authority: Authority,
      };
      await order.save();
      // کاربر را به صفحه جزئیات سفارش در فرانت‌اند هدایت می‌کنیم
      res.redirect(`${process.env.FRONTEND_URL}/order/${order._id}`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/order/${order._id}?error=payment_failed`);
    }
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.FRONTEND_URL}/order/${order._id}?error=verification_failed`);
  }
});


// ✨ توابع جدید را export می‌کنیم
export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered, verifyPayment };
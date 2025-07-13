// میان‌افزار برای مدیریت خطای 404 (مسیر ناموجود)
const notFound = (req, res, next) => {
  const error = new Error(`مسیر یافت نشد - ${req.originalUrl}`);
  res.status(404);
  next(error); // خطا را به میان‌افزار بعدی (error handler) پاس می‌دهیم
};

// میان‌افزار عمومی برای مدیریت تمام خطاها
const errorHandler = (err, req, res, next) => {
  // گاهی اوقات یک خطا ممکن است با کد وضعیت 200 (OK) بیاید
  // در این صورت، ما آن را به خطای سرور (500) تغییر می‌دهیم
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message: message,
    // در محیط توسعه، جزئیات بیشتری از خطا را نمایش می‌دهیم
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
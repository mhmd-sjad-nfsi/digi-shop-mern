// تابع کمکی برای افزودن اعشار به قیمت (اگر نیاز بود)
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // محاسبه قیمت کل آیتم‌ها
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // محاسبه هزینه ارسال (اگر قیمت کل بالای 1000000 تومان بود رایگان، وگرنه 70000 تومان)
  state.shippingPrice = addDecimals(state.itemsPrice > 1000000 ? 0 : 70000);

  // محاسبه مالیات (۱۵ درصد)
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

  // محاسبه قیمت نهایی
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // ذخیره کل state سبد خرید در LocalStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // اعتبار توکن: ۳۰ روز
  });
};

export default generateToken;
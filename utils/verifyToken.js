import jwt from 'jsonwebtoken';

export const TokenValidation = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json('Access deniced!');

  const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokensecret');
  req.userId = payload._id;
  next();
};

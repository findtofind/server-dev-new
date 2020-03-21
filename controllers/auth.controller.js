import jwt from 'jsonwebtoken';

import User from '../models/user1';

export const signUp = async (req, res) => {
  const { email, password } = req.body || {};
  const isExist = await User.findOne({ email: email });
  if (isExist)
    return res
      .status(401)
      .json({ error: true, message: 'This user is already exist!' });
  const user = new User({
    email,
    password
  });
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();
  const token = jwt.sign(
    { _id: savedUser._id, email: user.email },
    process.env.TOKEN_SECRET || 'findtofind'
  );
  res.header('auth-token', token).json({ success: true, error: null, token });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ error: true, message: 'Email or password is incorrect!' });
  const correctPassword = await user.validatePassword(password);
  if (!correctPassword)
    return res
      .status(405)
      .json({ error: true, message: 'Password is incorrect!' });
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.TOKEN_SECRET || 'findtofind',
    {
      expiresIn: 60 * 60 * 24
    }
  );
  res.header('auth-token', token).json({ success: true, err: null, token });
};

export const profile = async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId, { password: 0 });
  if (!user)
    return res.status(406).json({ error: true, message: 'User not found!' });
  res.json(user);
};

import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendResetCode } from '../utils/mailer.js';


const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.validPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: generateToken(user),
    user: { id: user._id, email: user.email, role: user.role },
  });
};

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'No user with that email' });
  }

  const code = crypto.randomInt(100000, 999999).toString(); // 6-digit code
  user.resetCode = code;
  user.resetCodeExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  await sendResetCode(email, code);

  res.json({ message: 'Reset code sent to email' });
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpires) {
    return res.status(400).json({ message: 'Invalid or expired code' });
  }

  user.password = newPassword;
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
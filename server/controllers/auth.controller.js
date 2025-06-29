import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.validPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: generateToken(user),
    user: { id: user.id, email: user.email, role: user.role },
  });
};

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.create({ email, password, role });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};

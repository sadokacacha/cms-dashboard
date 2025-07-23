// server/scripts/createTestUser.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: 'sadokacacha1998@gmail.com' });
    if (existing) {
      console.log('❗️User already exists');
      process.exit();
    }

    await User.create({
      email: 'sadokacacha1998@gmail.com',
      password: '123456',
      role: 'admin',
    });

    console.log('✅ Test user created: sadokacacha1998@gmail.com / 123456');
    process.exit();
  } catch (err) {
    console.error('Error creating user:', err);
    process.exit(1);
  }
};

run();

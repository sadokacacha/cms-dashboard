// server/scripts/createTestUser.js
import User from '../models/User.js';
import sequelize from '../config/db.js';

const run = async () => {
  await sequelize.sync(); // Ensure tables are created

  const existing = await User.findOne({ where: { email: 'admin@example.com' } });
  if (existing) {
    console.log('User already exists');
    process.exit();
  }

  await User.create({
    email: 'admin@example.com',
    password: '123456', // Will be hashed automatically by the model hook
    role: 'admin',
  });

  console.log('✅ Test user created: admin@example.com / 123456');
  process.exit();
};

run();

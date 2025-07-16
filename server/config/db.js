import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve('database.sqlite'), // or './database.sqlite'
  logging: false, // optional: disables SQL logging
});

export default sequelize;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class SeoMeta extends Model {}

SeoMeta.init(
  {
    path: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ogTitle: DataTypes.STRING,
    ogImage: DataTypes.STRING,
    scripts: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: 'SeoMeta',
    tableName: 'seo',
  }
);

export default SeoMeta;

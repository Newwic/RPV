const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtitle: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  features: {
    type: DataTypes.TEXT
  },
  applications: {
    type: DataTypes.TEXT
  },
  technicalSpecs: {
    type: DataTypes.TEXT
  },
  codeSizes: {
    type: DataTypes.TEXT
  },
  packaging: {
    type: DataTypes.TEXT
  },
  pdfLink: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;

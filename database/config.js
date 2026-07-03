// database/config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'rpv',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,           // เปลี่ยนเป็น true ถ้าอยากเห็น Query
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  }
});

module.exports = sequelize;

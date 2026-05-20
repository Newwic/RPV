// database/config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rpv', 'root', 'Neww_ic95559', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,           // เปลี่ยนเป็น true ถ้าอยากเห็น Query
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  }
});

module.exports = sequelize;
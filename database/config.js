const { Sequelize } = require('sequelize');

const isPostgresUrl = Boolean(process.env.DATABASE_URL);

const sequelize = isPostgresUrl
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      timezone: '+07:00',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(
      process.env.DB_NAME || 'rpv',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
        timezone: '+07:00',
        define: {
          charset: 'utf8mb4',
          collate: 'utf8mb4_general_ci'
        }
      }
    );

module.exports = sequelize;

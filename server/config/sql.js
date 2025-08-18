const { Sequelize } = require('sequelize');
const sql = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, process.env.SQL_PASSWORD, {
  host: process.env.SQL_SERVER,
  dialect: 'mssql',
  dialectOptions: { options: { encrypt: process.env.SQL_ENCRYPT === 'true' } },
  logging: false
});
module.exports = { sql };

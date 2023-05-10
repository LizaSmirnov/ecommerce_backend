require('dotenv').config();

const Sequelize = require('sequelize');



const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('localhost','root','4444', {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      port: 3306,
    });

module.exports = sequelize;



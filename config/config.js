require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
    port: process.env.PORTNAME
  },
  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
    port: process.env.PORTNAME
  },
  production: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
    port: process.env.PORTNAME
  }
};

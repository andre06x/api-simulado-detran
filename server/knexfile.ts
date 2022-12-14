//import path from 'path';
require('dotenv').config();

module.exports = {
  client: 'pg',
  connection : {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 90000
  }
   ,
  migrations: {
    directory:'src/database/migrations'
  },
  seeds: {
    directory: 'src/database/seeds'
  },
  useNullAsDefault: true
};
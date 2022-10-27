import knex from 'knex';
import path from 'path';
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection : {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 90000
  },
  useNullAsDefault: true,
  acquireConnectionTimeout: 5000,
  pool: {
    min: 0,
    max: 5000,
    createTimeoutMillis: 9000,
    acquireTimeoutMillis: 120 * 1000,
    idleTimeoutMillis: 8000,
    reapIntervalMillis: 9000,
    createRetryIntervalMillis: 500,
    propagateCreateError: false
  }
});

export default db;
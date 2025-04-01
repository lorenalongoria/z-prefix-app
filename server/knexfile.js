require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'inventoryuser',
      password: process.env.DB_PASSWORD || 'inventorypass',
      database: process.env.DB_NAME || 'inventorydb',
      port: process.env.DB_PORT || 5432,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

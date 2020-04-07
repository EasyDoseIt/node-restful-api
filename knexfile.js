module.exports = {
    development: {
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.DB_URL,
      migrations: {
        directory: "./database/migrations"
      },
      seeds: {
        directory: "./database/seeds"
    
      },
      seeds: {
        directory: "./database/seeds"
      }
    },
    testing: {
      client: 'jest',
      connection: {
        filename: './__tests__/server_test.spec.js',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds',
      },
    },
    production: {
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.DB_URL,
      migrations: {
        directory: "./database/migrations"
      },
      seeds: {
        directory: "./database/seeds"
      },
    },
  };
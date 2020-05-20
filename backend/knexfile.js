// // Update with your config settings.

// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './src/database/db.sqlite',
//     },
//     migrations: {
//       directory: './src/database/migrations',
//     },
//     useNullAsDefault: true,
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };

// Update with your config settings.

require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: [process.env.DATABASE_URL, { ssl: true }],
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  testing: {
    client: 'pg',
    connection: [process.env.DATABASE_URL, { ssl: true }],
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  production: {
    client: 'pg',
    connection: [process.env.DATABASE_URL, { ssl: true }],
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },
};
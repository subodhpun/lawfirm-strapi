const path = require('path');
const fs = require('fs');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const certPath = path.resolve(__dirname, '..', 'prod-ca-2021.crt');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false)
          ? {
              rejectUnauthorized: true, // Verify certificate
              ca: fs.existsSync(certPath) ? fs.readFileSync(certPath) : undefined,
            }
          : false,
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    mysql: { /* ... keep as is ... */ },
    sqlite: { /* ... keep as is ... */ },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

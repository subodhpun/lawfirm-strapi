const fs = require("fs");
const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");

  const caPath = path.join(__dirname, "../config/prod-ca-2021.crt"); // path to your cert

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        schema: env("DATABASE_SCHEMA", "public"),
        ssl: {
          rejectUnauthorized: true,
          ca: fs.existsSync(caPath) ? fs.readFileSync(caPath).toString() : undefined,
        },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, "..", env("DATABASE_FILENAME", ".tmp/data.db")),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};

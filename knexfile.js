const path = require("path");

if (process.env.USER) require("dotenv").config();

const {
  DATABASE_URL = "postgres://ipbsldjn:iJ6NycRrIzvNYqqPv6l_kR9qaXnubfC2@queenie.db.elephantsql.com:5432/ipbsldjn",
} = process.env;


module.exports = {
  development: {
    client: "postgresql",
    connection: {
      URL: DATABASE_URL,
      host: "queenie.db.elephantsql.com",
      database: "ipbsldjn",
      user: "ipbsldjn",
      password: "iJ6NycRrIzvNYqqPv6l_kR9qaXnubfC2"
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: {
      URL: DATABASE_URL,
      host: "queenie.db.elephantsql.com",
      database: "ipbsldjn",
      user: "ipbsldjn",
      password: "iJ6NycRrIzvNYqqPv6l_kR9qaXnubfC2"
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};




module.exports = {
  dev: {
    username: process.env.USER_MANAGEMENT_DEV_USER,
    password: process.env.USER_MANAGEMENT_DEV_PASSWORD,
    database: process.env.USER_MANAGEMENT_DEV_DATABASE,
    host: process.env.USER_MANAGEMENT_DEV_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    dialect: 'mysql'
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  production: {
    username: process.env.USER_MANAGEMENT_USER,
    password: process.env.USER_MANAGEMENT_PASSWORD,
    database: process.env.USER_MANAGEMENT_DATABASE,
    host: process.env.USER_MANAGEMENT_HOST,
    dialect: 'mysql'
  }
};

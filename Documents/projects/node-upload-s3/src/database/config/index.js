module.exports = {
  dev: {
    username: process.env.SOLO_DASHBOARD_DEV_USER,
    password: process.env.SOLO_DASHBOARD_DEV_PASSWORD,
    database: process.env.SOLO_DASHBOARD_DEV_DATABASE,
    host: process.env.SOLO_DASHBOARD_DEV_HOST,
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
    username: process.env.SOLO_DASHBOARD_USER,
    password: process.env.SOLO_DASHBOARD_PASSWORD,
    database: process.env.SOLO_DASHBOARD_DATABASE,
    host: process.env.SOLO_DASHBOARD_HOST,
    dialect: 'mysql'
  }
};

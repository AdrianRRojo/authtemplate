module.exports = {
    HOST: "localhost",
    USER: "auth_template",
    PASSWORD: "x",
    DB: "auth_template",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}
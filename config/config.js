require("dotenv").config();


module.exports = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  secret: "auth-secret-key",
};
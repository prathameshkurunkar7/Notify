require('dotenv').config();

module.exports = {
    "PORT": process.env.PORT || 3030,
    "DB_URL_LOCAL":process.env.DB_URL_LOCAL,
    "DB_URL_CLOUD":process.env.DB_URL_CLOUD,
    "JWT_SECRET_KEY":process.env.JWT_SECRET_KEY,
    "APP_URL":process.env.APP_URL
}
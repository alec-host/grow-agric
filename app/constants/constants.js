require('dotenv').config();

module.exports = {
    MOBILE_SERVER_PORT: process.env.PORT || 3001,
    DASHBORD_SERVER_PORT: process.env.ADMIN_PORT || 3002,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    DATABASE_NAME: process.env.DB_NAME,
    DATABASE_USER: process.env.DB_USER,
    DATABASE_HOST: process.env.DB_HOST,
    DATABASE_PORT: process.env.DB_PORT,
    DATABASE_PASS: process.env.DB_PASS,
    COOKIE_NAME: process.env.COOKIE_NAME,
    COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS,
    SUPER_ADMIN_ROLE: process.env.SUPER_ADMIN_ROLE
}
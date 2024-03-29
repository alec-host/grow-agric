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
    SUPER_ADMIN_ROLE: process.env.SUPER_ADMIN_ROLE,
    EMALIFY_PROJECT_ID: process.env.EMALIFY_PROJECT_ID,
    EMALIFY_BULK_SMS_KEY: process.env.EMALIFY_BULK_SMS_KEY,
    EMALIFY_BULK_SMS_SECRET: process.env.EMALIFY_BULK_SMS_SECRET,
    EMALIFY_BULK_SMS_SENDER_ID: process.env.EMALIFY_BULK_SMS_SENDER_ID,
    FIREBASE_ANDROID_API_KEY: process.env.FIREBASE_ANDROID_API_KEY,
    FIREBASE_BROWSER_API_KEY: process.env.FIREBASE_BROWSER_API_KEY,
    CLOUDAMQP_URL: process.env.CLOUDAMQP_URL,
    QUEUE_NAME_NOTIFICATION: process.env.QUEUE_NAME_NOTIFICATION,
    QUEUE_NAME_CHAT: process.env.QUEUE_NAME_CHAT
}
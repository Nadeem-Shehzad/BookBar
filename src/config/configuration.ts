export default () => ({
   PORT: parseInt(process.env.PORT ?? '3000', 10) || 3000,

   DB_TYPE: process.env.DATABASE_TYPE,
   DB_HOST: process.env.DATABASE_HOST,
   DB_PORT: process.env.DATABASE_PORT,
   DB_USER: process.env.DATABASE_USER,
   DB_NAME: process.env.DATABASE_NAME,
   DB_PASSWORD: process.env.DATABASE_PASS,

   JWT_SECRET: process.env.JWT_SECRET,
   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
});
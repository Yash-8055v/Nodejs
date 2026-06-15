require("dotenv/config");
const {defineConfig} = require("drizzle-kit");


const config = defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./models/index.js",
  dbCredentials: {
    url: process.env.DB_URI,
  },
});
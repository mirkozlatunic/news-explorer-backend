const { JWT_SECRET = "dev-secret" } = process.env;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/news_explorer";

module.exports = { JWT_SECRET, DATABASE_URL };

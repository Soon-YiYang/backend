const mysql = require("mysql2/promise");

//Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "database1.clwysuc4gk3h.us-east-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "testtest",
  database: process.env.DB_NAME || "database1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

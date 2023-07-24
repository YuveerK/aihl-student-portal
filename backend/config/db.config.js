const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "aihl_portal",
  password: "22Princeton@1",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;

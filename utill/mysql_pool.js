const mysql = require('mysql2');
const config = require('../config/db_config.js');

let pool = mysql.createPool(config);

module.exports = pool;
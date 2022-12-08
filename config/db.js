//dotenv nos permite leer las variables de entorno de nuestro .env
const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql2');
let connection;

try {
    connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {connection};
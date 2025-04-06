const { Pool, Client } = require("pg");  
const dotenv = require("dotenv");  
const fs = require('fs');  
dotenv.config();  

const pool = new Pool({  
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,  // Corregido:"datebase" → "database"
    port: process.env.DB_PORT,  
    ssl: {  
        rejectUnauthorized: true,  
        ca: fs.readFileSync('src/cert/ca.crt').toString(),  
    }  
});  

module.exports = pool;  

pool.connect((err, client, release) => {  // Corregido: "relase" → "release"
    if (err) {  
        console.log("Error de conexión", err.stack);  
    } else {  
        console.log("Conexión exitosa");  
        release();  // Corregido: "relase" → "release"
    }  
});

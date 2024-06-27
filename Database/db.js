import mysql from 'mysql2/promise'

const connection = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12716475',
    password: 'ngTnGUwwGF',
    database: 'sql12716475',
    port:3306
})



export default connection;


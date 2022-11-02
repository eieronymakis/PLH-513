var mysql = require('mysql2');
/*---------------------------------------------------
        SETUP MYSQL CONNECTION PARAMETERS
---------------------------------------------------*/
let con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "1111",
    database: "cloud_db",
	charset : 'utf8'
});

con.connect(function(err){
    if(err){
        console.log('--------------------------------------');
        console.log('Database Connection -> False');
        console.log('--------------------------------------');
	throw err;
        process.exit();
    }
    console.log('--------------------------------------');
    console.log('Database Connection -> True');
    console.log('--------------------------------------');
});

module.exports = {
    /*---------------------------------------------------  
                EXECUTES QUERY AND RETURNS DATA (ASYNC)
    ---------------------------------------------------*/
    executeQuery(query){
        return new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    },
}

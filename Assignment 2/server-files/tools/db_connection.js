var mysql = require('mysql2');
/*---------------------------------------------------
        SETUP MYSQL CONNECTION PARAMETERS
---------------------------------------------------*/
let con = mysql.createConnection({
    host: "172.18.1.6",
    port: 3306,
    user: "root",
    password: "secret",
    database: "idm",
	charset : 'utf8',
    dateStrings: true
});

con.connect(function(err){
    if(err){
        console.log('--------------------------------------');
        console.log('Database Connection -> False');
        console.log('--------------------------------------');
	throw err;
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

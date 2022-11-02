const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection');
router
    .route('/')
    .get(async (req,res) => {
        res.render('signup');
    })
    .post(async (req,res) => {
        let n = req.body.name_input;
        let sn = req.body.sname_input;
        let un = req.body.uname_input;
        let p = req.body.pass_input;
        let e = req.body.email_input;
        let r = req.body.role_input;
        
        let query = `SELECT COUNT(username) AS c FROM Users WHERE username = '${un}';`;
        let result = await connection.executeQuery(query);
        
        if(result[0].c != 0){
            res.status(200).send({
                signup : false,
                message: '❌ Username taken. Please choose another username.'
            }).end();
        }else{
            query = `INSERT INTO Users(name,surname,username,password,email,role,confirmed) VALUES('${n}','${sn}','${un}','${p}','${e}','${r}',0)`;
            result = await connection.executeQuery(query);
            if(result.affectedRows > 0){
                res.redirect('login');
            }else{
                res.status(500).send({
                    signup: false,
                    message: '❌ Someting went wrong... Try again!'
                }).end();     
            }
        }
    })

module.exports = router;
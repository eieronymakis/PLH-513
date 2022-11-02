const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection.js');

router
    .route('/')
    .post(async (req,res) => {
        let uname = req.body.username;
        let pass = req.body.password;
        let result = await connection.executeQuery(`SELECT password,id,confirmed,role FROM Users WHERE username = '${uname}'`);
        if(result.length <= 0){
            res.send({
                authentication: false,
                message: '❌ No such user'
            }).status(401).end();
        }else{
            if(result[0].password == pass){
                if(result[0].confirmed == 0){
                    res.send({
                        authentication: false,
                        message:'❌ Waiting for admin confirmation'
                    }).end();
                }else{
                    req.session.isAuthenticated = true;
                    req.session.uid = result[0].id;
                    req.session.role = result[0].role;
                    res.send({
                        authentication: true,
                        message:'✅ User authenticated'
                    })
                }
            }else{
                res.send({
                    authentication: false,
                    message: `❌ Credentials don't match`
                }).status(401).end();
            }
        }
})

module.exports = router;
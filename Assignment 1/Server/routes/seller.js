const e = require('express');
const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            res.render('seller');
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/products')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            let query = `SELECT Products.* FROM Products INNER JOIN Users ON Products.sellername = Users.username AND Users.id = ${req.session.uid}`;
            let result = await connection.executeQuery(query);
            res.send(result);
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/add')
    .post(async (req,res) =>{
        if(req.session.isAuthenticated){
            let query = `SELECT username FROM Users WHERE id = ${req.session.uid}`;
            let result = await connection.executeQuery(query);
            let username  = result[0].username;
            query = `INSERT INTO Products(name, pcode, price,dateofwithdrawl, sellername, category, pphoto)
                    VALUES('${req.body.name}','${req.body.pcode}',${req.body.price},'${req.body.date}','${username}','${req.body.category}','${req.body.pphoto}')`;
            result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/delete')
    .post(async (req,res) =>{
        if(req.session.isAuthenticated){
            let query = `DELETE FROM Products WHERE id = ${req.body.id}`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/update')
    .post(async (req,res) => {
        if(req.session.isAuthenticated){
            let query = `UPDATE Products SET name = "${req.body.name}", pcode = "${req.body.pcode}", price=${req.body.price}, dateofwithdrawl="${req.body.date}", category="${req.body.category}", pphoto="${req.body.pphoto}" WHERE id = ${req.body.id}`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

module.exports = router;
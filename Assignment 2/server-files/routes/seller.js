const e = require('express');
const express = require('express');
const { executeQuery } = require('../tools/db_connection');
const router = express.Router();
const connection = require('../tools/db_connection');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            if(req.session.role == 'ProductSeller'){
                res.render('seller');
            }else{
                res.redirect('/forbidden')
            }
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/products')
    .get(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role == 'ProductSeller'){
            let query = `SELECT products.* FROM products INNER JOIN users ON products.sellername = users.username AND users.id = ${req.session.uid}`;
            let result = await connection.executeQuery(query);
            res.send(result);
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/add')
    .post(async (req,res) =>{
        if(req.session.isAuthenticated && req.session.role == 'ProductSeller'){
            let query = `SELECT username FROM users WHERE id = ${req.session.uid}`;
            let result = await connection.executeQuery(query);
            let username  = result[0].username;
            query = `INSERT INTO products(name, pcode, price,dateofwithdrawl, sellername, category, pphoto)
                    VALUES('${req.body.name}','${req.body.pcode}',${req.body.price},'${req.body.dow}','${username}','${req.body.category}','${req.body.pphoto}')`;
            result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/:pid/delete')
    .delete(async (req,res) =>{
        if(req.session.isAuthenticated && req.session.role == 'ProductSeller'){
            let query = `DELETE FROM products WHERE id = ${req.params.pid}`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })


router
    .route('/products/:pid/info')
    .get(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role == 'ProductSeller'){
            let query =  `SELECT products.* FROM products INNER JOIN users ON products.sellername = users.username AND users.id = ${req.session.uid} AND products.id = ${req.params.pid}`;
            let result = await connection.executeQuery(query);
            res.send(result).status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/:pid/update')
    .post(async (req,res) =>{
        if(req.session.isAuthenticated && req.session.role == 'ProductSeller'){
            let query = `UPDATE products SET name = "${req.body.name}", pcode = "${req.body.pcode}", price = ${req.body.price}, dateofwithdrawl = "${req.body.dow}", category = "${req.body.category}", pphoto = "${req.body.pphoto}" WHERE sellername = "${req.body.sname}" AND id = ${req.params.pid}`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

module.exports = router;
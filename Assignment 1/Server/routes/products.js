const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            res.render('products');
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/all')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            let query = `SELECT * FROM Products;`
            let result = await connection.executeQuery(query);
            res.send(result).status(200).end();
        }else{
            res.status(401).end();
        }
    });

router
    .route('/addtocart')
    .post(async (req, res) => {
        if(req.session.isAuthenticated){
            let query = `INSERT INTO Carts(uid, pid, insertiondate) values (${req.session.uid},${req.body.pid},NOW())`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

module.exports = router;
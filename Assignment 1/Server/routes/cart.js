const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            res.render('cart');
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/items')
    .get(async (req, res) => {
        if(req.session.isAuthenticated){
            let query = `SELECT Products.*,Carts.insertiondate, Carts.id AS cid FROM Carts INNER JOIN Products ON Carts.pid = Products.id INNER JOIN Users on Users.id = Carts.uid WHERE Users.id = ${req.session.uid};`;
            let result = await connection.executeQuery(query);
            res.send(result).status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/items/:id/remove')
    .delete(async (req,res) => {
        if(req.session.isAuthenticated){
            let query = `DELETE FROM Carts WHERE id = ${req.params.id}`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

module.exports = router;
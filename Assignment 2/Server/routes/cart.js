const express = require('express');
const router = express.Router();
const dataStorage = require('../tools/dataStorage');
const keyrock = require('../tools/keyrock');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.authenticated){
            res.render('cart');
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/items')
    .get(async (req, res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUser(req.session.xsubtoken);
            let cart = await dataStorage.getCart(user.id);
            if(cart){
                res.status(200).send(cart)
            }else{
                res.status(500).end();
            }
        }else{
            res.status(401).end();
        }
    })

router
    .route('/items/:cid/remove')
    .delete(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUser(req.session.xsubtoken);
            let response = await dataStorage.removeCart(user.id, req.params.cid);
            if(response){
                res.status(200).end();
            }else{
                res.status(500).end();
            }
        }else{
            res.status(401).end();
        }
    })

module.exports = router;
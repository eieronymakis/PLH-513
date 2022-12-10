const express = require('express');
const router = express.Router();
const orion = require('../tools/orion');
const keyrock = require('../tools/keyrock');

router
    .route('/')
    .get(async (req,res) => {
        res.render('seller');
    })

router
    .route('/products')
    .get(async (req,res) => {
        if(req.session.authenticated){
            let products = await orion.getSellerProducts(req.session.xsubtoken);
            res.status(200).send(products);
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/add')
    .post(async (req,res) =>{
        if(req.session.authenticated){
            let product = req.body;
            orion.addProduct(req.session.xsubtoken, product);
            res.status(200).end();
        }else{ 
            res.status(401).end();
        }
    })

router
    .route('/products/:pid/delete')
    .delete(async (req,res) =>{
        if(req.session.authenticated){
            orion.removeProduct(req.params.pid);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })


router
    .route('/products/:pid/info')
    .get(async (req,res) => {
        if(req.session.authenticated){
            let pid = req.params.pid;
            let product = await orion.getProduct(req.session.xsubtoken, pid);
            res.status(200).send(product).end(); 
        }else{
            res.status(401).end();
        }
    })

router
    .route('/products/:pid/update')
    .post(async (req,res) =>{
        if(req.session.authenticated){
            let pid = req.params.pid;
            let product = req.body;
            let response = orion.updateProduct(product, pid);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })


module.exports = router;
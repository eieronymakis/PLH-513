const axios = require('axios');
const express = require('express');
const router = express.Router();
const orion = require('../tools/orion');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.authenticated){
            res.render('products');
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/all')
    .get(async (req,res) => {
    	if(req.session.authenticated){
            let products = await orion.getAllProducts();
            res.send(products);
        }else{
            res.status(401).end();
        }
    });

router
    .route('/add')
    .put(async (req,res) => {
        
    });

router
    .route('/addtocart')
    .post(async (req, res) => {
        
    })


router
    .route('/search')
    .get(async (req,res) => {
       
    });
        

module.exports = router;

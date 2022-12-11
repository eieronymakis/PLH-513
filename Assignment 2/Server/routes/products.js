const express = require('express');
const router = express.Router();
const orion = require('../tools/orion');
const dataStorage = require('../tools/dataStorage');
const keyrock = require('../tools/keyrock');

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
    .route('/:pid/addtocart')
    .post(async (req, res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUser(req.session.xsubtoken);
            let response = await dataStorage.addToCart({uid: user.id,pid: req.params.pid});
            if(response){
                res.status(200).end();
            }else{
                res.status(500).end();
            }
        }
    })


router
    .route('/search')
    .get(async (req,res) => {
       
    });
        

module.exports = router;

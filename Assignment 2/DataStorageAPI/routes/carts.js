const express = require('express');
const router = express.Router();
const mongoose = require('../tools/mongoose');


router
    .route('/')
    .get(async (req,res) => {
        let result = await mongoose.getCarts();
        res.status(200).send(result).end();
    })


router
    .route('/add')
    .post(async (req,res) => {
        try{
            let data = {uid: req.body.uid, pid: req.body.pid};
            mongoose.addCart(data);
            res.status(200).end();
        }catch(e){
            res.status(500).end();
        }
    })

router
    .route('/:uid')
    .get(async (req,res) => {
        let result = await mongoose.getUserCarts(req.params.uid);
        res.status(200).send(result).end();
    })

router
    .route('/:uid/delete/:cid')
    .delete(async (req,res) => {
        let result = await mongoose.removeUserCart(req.params.uid, req.params.cid);
        if(result)
            res.status(200).end();
        else
            res.status(500).end();
    })


module.exports = router;

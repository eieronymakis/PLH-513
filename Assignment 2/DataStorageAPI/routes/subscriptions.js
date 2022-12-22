const express = require('express');
const router = express.Router();
const mongoose = require('../tools/mongoose');


router
    .route('/add')
    .post(async (req,res) => {
        let data = {uid: req.body.uid, sid: req.body.sid, pid: req.body.pid};
        let result = await mongoose.addSubscription(data);
        res.status(200).send(result).end();
    })

router
    .route('/:sid')
    .get(async (req,res) => {
        let result = await mongoose.getSubscription(req.params.sid);
        res.status(200).send(result).end();
    })

router
    .route('/user/:uid')
    .get(async (req,res) =>{
        let result = await mongoose.getUserSubscriptions(req.params.uid);
        res.status(200).send(result).end();
    })

router
    .route('/delete/:sid')
    .delete(async (req,res) =>{
        let result = await mongoose.removeSubscription(req.params.sid);
        res.status(200).end();
    })

module.exports = router;

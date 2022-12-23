const express = require('express');
const router = express.Router();
const mongoose = require('../tools/mongoose');

router
    .route('/user/:uid')
    .get(async (req,res) =>{
        let result = await mongoose.getUserNotifications(req.params.uid);
        res.status(200).send(result).end();
    })

router
    .route('/add')
    .post(async (req,res) =>{
        let data = {uid: req.body.uid, sid: req.body.sid, message: req.body.message};
        let result = await mongoose.addNotification(data);
        res.status(200).end();
    })

router
    .route('/delete/:nid')
    .delete(async (req,res) =>{
        console.log(req.params.nid);
        let result = await mongoose.removeNotification(req.params.nid);
        res.status(200).end();
    })

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('../tools/mongoose');

router
    .route('/user/:uid')
    .get(async (req,res) =>{
        let result = await mongoose.getUserNotifications(req.params.uid);
        res.status(200).send(result).end();
    })

module.exports = router;
const express = require('express');
const router = express.Router();
const keyrock = require('../tools/keyrock');

router
    .route('/')
    .get(async (req,res) => {
        res.render('signup');
    })
    .post(async (req,res) => {
        let result = await keyrock.registerUser(req.body);
        if(result)
            res.redirect('/login')
        else
            res.redirect('/signup')
    })

module.exports = router;
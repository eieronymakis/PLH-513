const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (req,res) => {
        if(!req.session.authenticated){
            res.render('login');
        }else{
            res.redirect('/welcome')
        }
    })

module.exports = router;

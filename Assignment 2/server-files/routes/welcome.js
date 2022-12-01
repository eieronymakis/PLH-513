const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            res.render('welcome');
        }else{
            res.redirect('/login');
        }   
    })

module.exports = router;
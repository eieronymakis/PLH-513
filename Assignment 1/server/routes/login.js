const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            res.redirect('/welcome');
        }else{
            res.render('login')
        }
    })

module.exports = router;
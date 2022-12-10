const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.authenticated){
            if(req.session.authenticated){
                res.render('administration');
            }else{
                res.redirect('/forbidden');
            }
        }else{
            res.redirect('/login');
        }
    })

module.exports = router;
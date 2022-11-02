const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            if(req.session.role == 'Admin'){
                res.render('administration');
            }else{
                res.redirect('/forbidden');
            }
        }else{
            res.redirect('/login');
        }
    })

module.exports = router;
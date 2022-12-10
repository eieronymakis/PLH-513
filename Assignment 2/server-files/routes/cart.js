const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.authenticated){
            res.render('cart');
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/items')
    .get(async (req, res) => {
        
    })

router
    .route('/items/:id/remove')
    .delete(async (req,res) => {
        
    })

module.exports = router;
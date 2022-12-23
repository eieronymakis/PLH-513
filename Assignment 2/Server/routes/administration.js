const express = require('express');
const router = express.Router();
const keyrock = require('../tools/keyrock');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUserRole(req.session.xsubtoken);
            if(user.role_name === 'Admin' || user.role_name === 'Provider'){
                res.render('administration');
            }else{
                res.redirect('/forbidden');
            }
        }else{
            res.redirect('/login');
        }
    })

module.exports = router;
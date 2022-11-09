const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async(req,res)=>{;
        req.session.destroy(function (err) {
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    });


module.exports = router;
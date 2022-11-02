const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (req,res) => {
        res.render('forbidden');
    })

module.exports = router;
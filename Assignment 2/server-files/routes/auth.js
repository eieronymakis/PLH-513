const express = require('express');
const router = express.Router();
const axios = require('axios');
const keyrock = require('../tools/keyrock');

router
    .route('/')
    .post(async (req,res) => {
		  keyrock.login(req, res);
    })

module.exports = router;

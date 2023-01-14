const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (req,res) => {
		  res.status(301).redirect("http://127.0.0.1:3005");
    })

module.exports = router;

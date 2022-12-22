const express = require('express');
const router = express.Router();

router
    .route('/webhook')
    .post(async (req,res) => {
        console.log("hit");
        console.log(req.body);
        res.status(204).send();
    })

module.exports = router;
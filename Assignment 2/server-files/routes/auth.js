const express = require('express');
const router = express.Router();
const axios = require('axios');

router
    .route('/')
    .post(async (req,res) => {
        let uname = req.body.username;
        let pass = req.body.password;
        axios.post('http://172.18.1.5:3005/v1/auth/tokens',{
        	"name":uname,
        	"password":pass
        })
        .then((response) => {
        	if(response.status===201){
				req.session.isAuthenticated = true;
				req.session.token = response.headers['x-subject-token'];
        		res.send({
        			"authentication":true,
					"token":req.session.token
        		}).status(200).end();
			}
        }, (error) => {
			res.send({
				"authentication":false,
				"message": error.response.data.error.message
			}).status(401).end();
        });
    })

module.exports = router;

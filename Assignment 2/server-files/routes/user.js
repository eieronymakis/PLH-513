const express = require('express');
const router = express.Router();
const axios = require('axios');
let keyrock = require('../tools/keyrock');

const keyrockEndpoint = 'http://172.18.1.5:3005';

router
    .route('/info')
    .get(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUser(req.session.xsubtoken);
            let role = await keyrock.getUserRole(req.session.xsubtoken);
            user.role = role.role_name;
            res.status(200).send(user).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/all')
    .get(async (req,res) => {
        let xauth = await keyrock.getToken();
        axios.get(`http://172.18.1.5:3005/v1/users`, {
            headers:{
                'X-Auth-token': xauth
            }
        }).then(async (response) => {
            let users = response.data.users;
            res.status(200).send(users).end();
        }).catch((response) => {
            res.status(500).end();
        })
    })

router
    .route('/info/:id')
    .get(async (req,res) => {
        
    })

router
    .route('/update')
    .post(async (req,res) => {
        
    })

router
    .route('/confirm')
    .post(async (req,res) => {
       
    })

router
    .route('/delete')
    .post(async (req,res) => {
       
    })

module.exports = router;
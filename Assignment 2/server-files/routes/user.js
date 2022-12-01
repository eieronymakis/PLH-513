const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection');
const axios = require('axios');

router
    .route('/info')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            let response = await axios.get('http://172.18.1.5:3005/v1/auth/tokens', {
                headers: {
                    'Content-Type':'application/json',
                    'X-Auth-token':req.session.token,
                    'X-Subject-token': req.session.token
                }
            })
            let uid = response.data.User.id;
            response = await axios.get(`http://172.18.1.5:3005/v1/users/${uid}`,{
                headers: {
                    'X-Auth-token':req.session.token
                }
            })
            res.send(response.data).status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/all')
    .get(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role=='Admin'){
            let query = `SELECT id,name,surname,username,email,role,confirmed FROM users;`
            let result = await connection.executeQuery(query);
            res.send(result).status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/info/:id')
    .get(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role=='Admin'){
            let query = `SELECT id,name,surname,username,email,role,confirmed FROM users WHERE id = ${req.params.id};`
            let result = await connection.executeQuery(query);
            res.send(result).status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/update')
    .post(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role=='Admin'){
            let query = `UPDATE users SET name = '${req.body.name}', surname = '${req.body.surname}',email = '${req.body.email}',role = '${req.body.role}',confirmed = ${req.body.confirmed}
            WHERE id = ${req.body.id} AND username = '${req.body.username}';`
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/confirm')
    .post(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role=='Admin'){
            let query = `UPDATE users SET confirmed = 1 WHERE id = ${req.body.id};`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/delete')
    .post(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role=='Admin'){
            let query = `DELETE FROM users WHERE id = ${req.body.id};`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })
module.exports = router;
const express = require('express');
const router = express.Router();
const connection = require('../tools/db_connection');

router
    .route('/info')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            let query = `SELECT * FROM users WHERE id=${req.session.uid}`;
            let result = await connection.executeQuery(query);
            res.send(result[0]).status(200).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/all')
    .get(async (req,res) => {
        if(req.session.isAuthenticated && req.session.role=='Admin'){
            let query = `SELECT id,name,surname,username,email,role,confirmed FROM Users;`
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
            let query = `SELECT id,name,surname,username,email,role,confirmed FROM Users WHERE id = ${req.params.id};`
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
            let query = `UPDATE Users SET name = '${req.body.name}', surname = '${req.body.surname}',email = '${req.body.email}',role = '${req.body.role}',confirmed = ${req.body.confirmed}
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
            let query = `UPDATE Users SET confirmed = 1 WHERE id = ${req.body.id};`;
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
            let query = `DELETE FROM Users WHERE id = ${req.body.id};`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })
module.exports = router;
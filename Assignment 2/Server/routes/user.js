const express = require('express');
const router = express.Router();
let keyrock = require('../tools/keyrock');

router
    .route('/info')
    .get(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUser(req.session.xsubtoken);
            let role = await keyrock.getUserRole(req.session.xsubtoken);
            res.status(200).send({"id" : user.id, "username" : user.username, "role" : role.role_name}).end();
        }else{
            res.status(401).end();
        }
    })

router
    .route('/all')
    .get(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUserRole(req.session.xsubtoken);
            if(user.role_name === "Admin" || user.role_name === "admin" || user.role_name === "Provider"){
                let u =  await keyrock.getAppUsers();
                res.status(200).send(u).end();
            }else{
                res.status(401).end();
            }
        }else{
            res.status(401).end();
        }
    })

router
    .route('/info/:id')
    .get(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUserRole(req.session.xsubtoken);
            if(user.role_name === "Admin" || user.role_name === "admin" || user.role_name === "Provider"){
                let u = await keyrock.getAppUser(req.params.id);
                res.status(200).send(u).end();
            }else{
                res.status(401).end();
            }
        }else{
            res.status(401).end();
        }
    })

router
    .route('/update/:id')
    .patch(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUserRole(req.session.xsubtoken);
            if(user.role_name === "Admin" || user.role_name === "admin" || user.role_name === "Provider"){
                let r = await keyrock.updateUser(req.params.id, req.body.username);
                res.status(200).end();
            }else{
                res.status(401).end();
            }
        }else{
            res.status(401).end();
        }
    })

router
    .route('/delete/:id')
    .delete(async (req,res) => {
        if(req.session.authenticated){
            let user = await keyrock.getUserRole(req.session.xsubtoken);
            if(user.role_name === "Admin" || user.role_name === "admin" || user.role_name === "Provider"){
                await keyrock.deleteUser(req.params.id);
                res.status(200).end();
            }else{
                res.status(401).end();
            }
        }else{
            res.status(401).end();
        }
    })

module.exports = router;
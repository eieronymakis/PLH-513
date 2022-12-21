const express = require('express');
const router = express.Router();
let keyrock = require('../tools/keyrock');

router
    .route('/info')
    .get(async (req,res) => {
        let user = await keyrock.getUser(req.session.xsubtoken);
        let role = await keyrock.getUserRole(req.session.xsubtoken);
        res.status(200).send({"id" : user.id, "username" : user.username, "role" : role.role_name}).end();
    })

router
    .route('/all')
    .get(async (req,res) => {
       let u =  await keyrock.getAppUsers();
       res.status(200).send(u).end();
    })

router
    .route('/info/:id')
    .get(async (req,res) => {
        let u = await keyrock.getAppUser(req.params.id);
        res.status(200).send(u).end();
    })

router
    .route('/update/:id')
    .patch(async (req,res) => {
        let r = await keyrock.updateUser(req.params.id, req.body.username);
        res.status(200).end();
    })

// router
//     .route('/confirm')
//     .post(async (req,res) => {
       
//     })

router
    .route('/delete/:id')
    .delete(async (req,res) => {
        await keyrock.deleteUser(req.params.id);
        res.status(200).end();
    })

module.exports = router;
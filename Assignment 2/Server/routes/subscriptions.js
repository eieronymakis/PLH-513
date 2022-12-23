const express = require('express');
const router = express.Router();
const orion = require('../tools/orion');
const keyrock = require('../tools/keyrock');
const dataStorage = require('../tools/dataStorage');

router
    .route('/webhook')
    .post(async (req,res) => {
        let sid = req.body.subscriptionId;
        let sub = await dataStorage.getSubscriptionById(sid);
        let uid = sub.uid;
        let pid = sub.pid;
        let product = await orion.getProductByID(pid);
        let product_name = product.name;
        let available = req.body.data[0].available;
        let message;
        if(available == 0)
            message = `Product ${product_name} is sold out ! You will get notified when it's back in stock.`;
        else
            message = `Product ${product_name} is in stock !`;
        let result = await dataStorage.addNotification({uid : uid, sid: sid, message : message});
        res.status(204).send();
    })

router
    .route('/notifications/delete/:nid')
    .delete(async (req, res) => {
        let result = await dataStorage.removeNotification(req.params.nid);
        res.status(200).end();
    })

router
    .route('/add')
    .post(async (req,res) => {
        let user = await keyrock.getUser(req.session.xsubtoken);
        let r = await dataStorage.getUserSubscriptions(user.id);
        let exists = false;
        for(let i  = 0; i < r.length; i++){
            if(r[i].pid === req.body.pid){
                exists = true;
                break;
            }
        }
        if(exists)
            res.status(200).end();
        else{
            await orion.addSubscription({pid: req.body.pid});
            let result = await orion.getSubscriptionId();
            let subscriptionID = result.id;
            await dataStorage.addSubscription({uid : user.id, sid: subscriptionID, pid: req.body.pid});
            res.status(200).send(result).end();
        }
    })

router
    .route('/delete')
    .delete(async (req,res) => {
        let r = await dataStorage.removeSubscription(req.query.dssid);
        let r2 = await orion.removeSubscription(req.query.osid);
        res.status(200).end();
    })
 
router
    .route('/view')
    .get(async (req,res) => {
        let user = await keyrock.getUser(req.session.xsubtoken);
        let result = await dataStorage.getUserSubscriptions(user.id);
        res.status(200).send(result).end();
    })

router
    .route('/notifications')
    .get(async (req,res) => {
        let user = await keyrock.getUser(req.session.xsubtoken);
        let result = await dataStorage.getUserNotifications(user.id);
        res.status(200).send(result).end();
    })

module.exports = router;
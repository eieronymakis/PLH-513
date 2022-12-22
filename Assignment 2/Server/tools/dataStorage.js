const axios = require('axios');
const orion = require('./orion');

const dataStorageProxy = 'http://172.18.1.12:3001';
const headers ={headers:{'X-Auth-Token': process.env.DATA_STORAGE_PROXY_KEY}};

module.exports.addNotification = async (_d) => {
    try{
        await axios.post(`${dataStorageProxy}/notifications/add`,{uid: _d.uid, sid : _d.sid, message : _d.message},headers);
        return true;
    }catch(e){
        console.log('Server : Error @ Notification Insertion');
        return false;
    }
}

module.exports.getUserNotifications = async (_uid) => {
    try{
        let result = await axios.get(`${dataStorageProxy}/notifications/user/${_uid}`,headers);
        return result.data;
    }catch(e){
        console.log('Server : Error @ Fetching User Notifications');
        return {};
    }
}

module.exports.addSubscription = async(_s) => {
    try{
        await axios.post(`${dataStorageProxy}/subscriptions/add`, {uid: _s.uid, sid : _s.sid, pid: _s.pid}, headers)
        return true;
    }catch(e){
        console.log('Server : Error @ Subscription Insertion');
        return false;
    }
}

module.exports.getSubscriptionById = async(_sid) => {
    try{
        let result = await axios.get(`${dataStorageProxy}/subscriptions/${_sid}`, headers);
        return result.data[0];
    }catch(e){
        console.log('Server : Error @ Fetching Subscription By ID');
        return false;
    }
}

module.exports.getUserSubscriptions = async (_uid) =>{
    try{
        let result = await axios.get(`${dataStorageProxy}/subscriptions/user/${_uid}`, headers);
        return result.data;
    }catch(e){
        console.log('Server : Error @ Fetching User Subscriptions');
        return {};
    }
}

module.exports.removeSubscription = async (_sid) => {
    try{
        let result = await axios.delete(`${dataStorageProxy}/subscriptions/delete/${_sid}`,headers);
        return true;
    }catch(e){
        console.log('Server : Error @ Subscription Deletion');
        return false;
    }
}

module.exports.addToCart = async (_d) => { 
    try{
        await axios.post(`${dataStorageProxy}/carts/add`,{uid: _d.uid, pid: _d.pid}, headers)
        return true;
    }catch(e){
        console.log('Server : Error @ Cart Insertion');
        return false;
    }
}

module.exports.getCart = async (_uid) => {
    try{
        let response = await axios.get(`${dataStorageProxy}/carts/${_uid}`, headers);
        let items = response.data;
        for(let i in items){
           items[i].description = await orion.getProductByID(items[i].pid);
        }
        return items;
    }catch(e){
        console.log('Server : Error @ Cart Fetching');
        return {};
    }
}

module.exports.removeCart = async(_uid, _cid) => {
    try{
        let response = await axios.delete(`${dataStorageProxy}/carts/${_uid}/delete/${_cid}`, headers);
        return true;
    }catch(e){
        console.log('Server : Error @ Cart Deletion');
        return false;
    }
}
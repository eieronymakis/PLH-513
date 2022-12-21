const axios = require('axios');
const orion = require('./orion');

const dataStorageProxy = 'http://localhost:3001';
const headers ={headers:{'X-Auth-Token': process.env.DATA_STORAGE_PROXY_KEY}};

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
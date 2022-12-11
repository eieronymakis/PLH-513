const axios = require('axios');
const dataStorageUrl = 'http://127.0.0.1:3000'
const orion = require('./orion');

module.exports.addToCart = async (_d) => { 
    try{
        await axios.post(`${dataStorageUrl}/carts/add`,{uid: _d.uid, pid: _d.pid})
        return true;
    }catch(e){
        console.log('Server : Error @ Cart Insertion');
        return false;
    }
}

module.exports.getCart = async (_uid) => {
    try{
        let response = await axios.get(`${dataStorageUrl}/carts/${_uid}`);
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
        let response = await axios.delete(`${dataStorageUrl}/carts/${_uid}/delete/${_cid}`);
        return true;
    }catch(e){
        console.log('Server : Error @ Cart Deletion');
        return false;
    }
}
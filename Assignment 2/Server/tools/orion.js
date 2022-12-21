const axios = require('axios');
const keyrock = require('./keyrock');
const crypto = require('crypto');
require('dotenv').config();

const orionProxy = "http://localhost:1027";
const headers ={headers:{'X-Auth-Token': process.env.ORION_PROXY_KEY}};


module.exports.getSellerProducts = async(_xsubtoken) => {
    try{
        let user = await keyrock.getUser(_xsubtoken);
        let response = await axios.get(`${orionProxy}/v2/entities?options=keyValues&q=seller==${user.id}`,headers);
        return response.data;
    }catch(e){
        return null;
    }
}

module.exports.getAllProducts = async() => {
    try{
        let response = await axios.get(`${orionProxy}/v2/entities?options=keyValues`,headers);
        let products = response.data;
        for(let p in products){
            let uid = products[p].seller;
            products[p].seller = await keyrock.getUsernameByID(uid);
        }
        return products;
    }catch(e){
        return null;
    }
}

module.exports.getProductByID = async( _pid) => {
    try{
        let response = await axios.get(`${orionProxy}/v2/entities/${_pid}?options=keyValues`,headers);
        let product = response.data;
        return product;
    }catch(e){
        return null;
    }
}

module.exports.getProduct = async(_xsubtoken, _pid) => {
    try{
        let user = await keyrock.getUser(_xsubtoken);
        let response = await axios.get(`${orionProxy}/v2/entities?options=keyValues&q=seller==${user.id}&id=${_pid}`,headers);
        let product = response.data[0];
        return product;
    }catch(e){
        return null;
    }
}

module.exports.addProduct = async(_xsubtoken, _product) => {
    try{
        let user = await keyrock.getUser(_xsubtoken);
        let data = {
            "type": "Product",
            "name": {
                "value": _product.name,
                "type": "String"
            },
            "category": {
                "value": _product.category,
                "type": "String"
            },
            "seller": {
                "value": user.id,
                "type": "String"
            },
            "price": {
                "value": _product.price,
                "type": "Float"
            },
            "dateofwithdrawl": {
                "value": _product.dateofwithdrawl,
                "type": "DateTime"
            },
            "code":{
                "value": _product.code,
                "type": "String"
            },
            "photo":{
                "value": _product.photo,
                "type": "String"
            }
        }
        let hash = crypto.createHash('md5').update(JSON.stringify(data)).digest("hex");
        data.id = hash;
        axios.post(`${orionProxy}/v2/entities`,data,headers);
        return hash;
    }catch(e){
        return null;
    }
}

module.exports.removeProduct = async(_id) =>{
    try{
        let response = await axios.delete(`${orionProxy}/v2/entities/${_id}`,headers);
        return true;
    }catch(e){
        return null;
    }
}

module.exports.updateProduct = async(_product, _id) => {
    try{
        let data = {
            "name": {
                "value": _product.name,
                "type": "String"
            },
            "category": {
                "value": _product.category,
                "type": "String"
            },
            "price": {
                "value": _product.price,
                "type": "Float"
            },
            "dateofwithdrawl": {
                "value": _product.dateofwithdrawl,
                "type": "DateTime"
            },
            "code":{
                "value": _product.code,
                "type": "String"
            },
            "photo":{
                "value": _product.photo,
                "type": "String"
            }
        }
        await axios.patch(`${orionProxy}/v2/entities/${_id}/attrs`,data,headers);
        return true;
    }catch(e){
        return null;
    }
}

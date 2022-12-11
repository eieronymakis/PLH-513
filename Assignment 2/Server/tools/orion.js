const axios = require('axios');
const keyrock = require('./keyrock');
const crypto = require('crypto');
require('dotenv').config();

const orionEndpoint = "http://172.18.1.9:1026";


module.exports.getSellerProducts = async(_xsubtoken) => {
    try{
        let user = await keyrock.getUser(_xsubtoken);
        let response = await axios.get(`${orionEndpoint}/v2/entities?options=keyValues&q=seller==${user.id}`);
        return response.data;
    }catch(e){
        return null;
    }
}

module.exports.getAllProducts = async() => {
    try{
        let response = await axios.get(`${orionEndpoint}/v2/entities?options=keyValues`);
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
        let response = await axios.get(`${orionEndpoint}/v2/entities/${_pid}?options=keyValues`);
        let product = response.data;
        return product;
    }catch(e){
        return null;
    }
}

module.exports.getProduct = async(_xsubtoken, _pid) => {
    try{
        let user = await keyrock.getUser(_xsubtoken);
        let response = await axios.get(`${orionEndpoint}/v2/entities?options=keyValues&q=seller==${user.id}&id=${_pid}`);
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
        axios({
            method: 'post',
            url: `${orionEndpoint}/v2/entities`,
            data: data
        });
        return hash;
    }catch(e){
        return null;
    }
}

module.exports.removeProduct = async(_id) =>{
    try{
        let response = await axios.delete(`${orionEndpoint}/v2/entities/${_id}`);
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
        axios({
            method: 'patch',
            url: `${orionEndpoint}/v2/entities/${_id}/attrs`,
            data: data
        });
        return true;
    }catch(e){
        return null;
    }
}
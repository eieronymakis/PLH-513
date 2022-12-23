const axios = require('axios');
const keyrock = require('./keyrock');
const crypto = require('crypto');
require('dotenv').config();

const orionProxy = "http://172.18.1.10:1027";
const headers ={headers:{'X-Auth-Token': process.env.ORION_PROXY_KEY}};


module.exports.getSubscriptionId = async () => {
    try{
        let result = await axios.get(`${orionProxy}/v2/subscriptions`,headers);
        let target = result.data;
        return target[target.length-1];
    }catch(e){
        return null;
    }
}

module.exports.addSubscription = async (_d) => {
    try{
        let data = {
                "description": "Product Subscription",
                "subject": {
                  "entities": [
                    {
                      "id": `${_d.pid}`,
                      "type": "Product"
                    }
                  ],
                  "condition": {
                    "attrs": ["available"]
                  }
                },
                "notification": {
                  "http": {
                    "url": "http://172.18.1.8:80/subscriptions/webhook"
                  },
                  "attrsFormat" : "keyValues"
                }
        }
        await axios.post(`${orionProxy}/v2/subscriptions`, data, headers);
        return true;
    }catch(e){
        return false;
    }
}

module.exports.removeSubscription = async (_sid) => {
    try{
        await axios.delete(`${orionProxy}/v2/subscriptions/${_sid}`, headers);
        return true;
    }catch(e){
        return false;
    }
}

module.exports.getSellerProducts = async(_xsubtoken) => {
    try{
        let user = await keyrock.getUser(_xsubtoken);
        let response = await axios.get(`${orionProxy}/v2/entities?options=keyValues&q=seller==${user.id}`,headers);
        return response.data;
    }catch(e){
        console.log('Error @ Seller Product Fetching (all)')
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
        console.log('Error @ Product Fetching (all)');
        return null;
    }
}

module.exports.getProductByID = async( _pid) => {
    try{
        let response = await axios.get(`${orionProxy}/v2/entities/${_pid}?options=keyValues`,headers);
        let product = response.data;
        return product;
    }catch(e){
        console.log('Error @ Product Fetching');
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
        console.log('Error @ Seller Product Fetching');
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
            },
            "available":{
                "value": _product.available,
                "type": "Integer"
            }
        }
        let hash = crypto.createHash('md5').update(JSON.stringify(data)).digest("hex");
        data.id = hash;
        axios.post(`${orionProxy}/v2/entities`,data,headers);
        return hash;
    }catch(e){
        console.log('Error @ Product Insertion');
        return null;
    }
}

module.exports.removeProduct = async(_id) =>{
    try{
        let response = await axios.delete(`${orionProxy}/v2/entities/${_id}`,headers);
        return true;
    }catch(e){
        console.log('Error @ Product Deletion');
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
            },
            "available":{
                "value":_product.available,
                "type": "Integer"
            }
        }
        await axios.patch(`${orionProxy}/v2/entities/${_id}/attrs`,data,headers);
        return true;
    }catch(e){
        console.log('Error @ Product Update');
        return null;
    }
}

module.exports.filterProducts = async(_name,_seller,_cat,_plow,_phigh,_dlow,_dhigh) => {
    try{
        var dl = new Date(_dlow), dh = new Date(_dhigh);
        let products = await this.getAllProducts();
        if(_name!=="")
            products = products.filter(a => (((a.name).toLowerCase()).match(`${(_name).toLowerCase()}`)!=null));
        if(_seller!=="")
            products = products.filter(a => (((a.seller).toLowerCase()).match(`${(_seller).toLowerCase()}`)!=null));
        if(_cat!=="")
            products = products.filter(a => (((a.category).toLowerCase()).match(`${(_cat).toLowerCase()}`)!=null));
        if(isNumber(parseFloat(_plow)) && isNumber(parseFloat(_phigh)) && parseFloat(_plow) < parseFloat(_phigh))
            products = products.filter(a => (a.price >= parseFloat(_plow) && a.price <= parseFloat(_phigh)));
        if(dl < dh)
            products = products.filter(a => new Date(a.dateofwithdrawl) >= dl && new Date(a.dateofwithdrawl) <= dh);
        return products;    
    }catch(e){
        console.log('Error @ Product Filtering');
        return null;
    }
}


function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
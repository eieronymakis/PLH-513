/*------------------------------------------------------------------
        Initialize OrionCB Products using this script
------------------------------------------------------------------*/

const crypto = require('crypto');
const axios =  require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env') })

const orionProxy = "http://localhost:1027";
const headers ={headers:{'X-Auth-Token': process.env.ORION_PROXY_KEY}};

const postToOrion = async (elem, c) =>{
    data = {
        "type": "Product",
        "name": {
            "value": elem.name,
            "type": "String"
        },
        "category": {
            "value": elem.category,
            "type": "String"
        },
        "seller": {
            "value": elem.seller,
            "type": "String"
        },
        "price": {
            "value": elem.price,
            "type": "Float"
        },
        "dateofwithdrawl": {
            "value": elem.dateofwithdrawl,
            "type": "DateTime"
        },
        "code":{
            "value": elem.pcode,
            "type": "String"
        },
        "photo":{
            "value": elem.photo,
            "type": "String"
        }
    }
    let hash = crypto.createHash('md5').update(JSON.stringify(data)).digest("hex");
    data.id = hash;
    await axios.post(`${orionProxy}/v2/entities`,data,headers);
    return true;
} 

let raw = fs.readFileSync('./sample-products.json');
let products = JSON.parse(raw);

(async () => {
    let counter = 5;
    for(var p in products){
        await postToOrion(products[p], counter);
        counter++;
    }
    console.log("--------------------------------------------------")
    console.log("Items imported in OrionCB database!")
    console.log("--------------------------------------------------")
})();



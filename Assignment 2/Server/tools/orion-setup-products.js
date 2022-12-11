/*------------------------------------------------------------------
        Initialize OrionCB Products using this script
------------------------------------------------------------------*/

const crypto = require('crypto');
const axios =  require('axios');
const fs = require('fs');


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
    axios({
        method: 'post',
        url: 'http://localhost:1026/v2/entities',
        data: data
    });
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


const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://172.18.1.7:27017/cloudDB');

const cartSchema = new mongoose.Schema({
    uid: {type: String, required:true},
    pid: {type: String, required:true},
    doi: {type: Date, required:true}
}, {collection: 'Carts', versionKey: false});
const cart = mongoose.model('Carts', cartSchema);


module.exports.addCart = (_d) => {
    let _cart = new cart({
        uid: _d.uid,
        pid: _d.pid,
        doi: Date.now()
    });
    _cart.save(function(error,response){
        if(error){
            console.log("-------------------------------\n"+
                        "Error @ Cart Insertion\n"+
                        "-------------------------------");
            return false;
        }else{
            return true;
        }
    });    
}

module.exports.getCarts = async () => {
    try{
        let d = await cart.find({});
        return d;
    }catch(e){
        console.log("-------------------------------\n"+
                    "Error @ All Cart Fetching\n"+
                    "-------------------------------");
        return {};
    }
}

module.exports.getUserCarts = async (_id) => {
    try{
        let d = await cart.find({uid: _id});
        return d;
    }catch(e){
        console.log("-------------------------------\n"+
                    "Error @ User Cart Fetching\n"+
                    "-------------------------------");
        return {};
    }
}

module.exports.removeUserCart = async(_uid, _cartid) => {
    try{
        let d = await cart.deleteOne({_id:_cartid, uid: _uid});
        return true;
    }catch(e){
        console.log("-------------------------------\n"+
                    "Error @ Deleting User Cart \n"+
                    "-------------------------------");
        return false;
    }
}

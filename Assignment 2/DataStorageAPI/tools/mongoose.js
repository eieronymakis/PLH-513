const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://172.18.1.7:27017/cloudDB');

const cartSchema = new mongoose.Schema({
    uid: {type: String, required:true},
    pid: {type: String, required:true},
    doi: {type: Date, required:true}
}, {collection: 'Carts', versionKey: false});
const cart = mongoose.model('Carts', cartSchema);

const subscriptionSchema = new mongoose.Schema({
    uid: {type: String, required:true},
    sid: {type: String, required:true},
    pid: {type: String, required:true}
}, {collection: 'Subscriptions', versionKey: false});
const sub = mongoose.model('Subscriptions', subscriptionSchema);

const notificationSchema = new mongoose.Schema({
    uid: {type: String, required:true},
    message: {type: String, required:true}
}, {collection: 'Notifications', versionKey: false});
const notification = mongoose.model('Notifications',notificationSchema);

module.exports.addNotification = (_d) => {
    let _notif = new notification({
        uid: _d.uid,
        message: _d.message
    })
    _notif.save(function(error, response){
        if(error){
            console.log("-------------------------------\n"+
                        "Error @ Notification Insertion\n"+
                        "-------------------------------");
            return true;
        }else{
            return false;
        }
    })
}

module.exports.removeNotification = async (_nid) => {
    try{
        let d = await cart.deleteOne({_id: _nid});
        return true;
    }catch(e){
        console.log("-------------------------------\n"+
                    "Error @ Notification Deletion\n"+
                    "-------------------------------");
        return false;
    }
}

module.exports.getUserNotifications = async (_uid) => {
    try{
        let d = await notification.find({uid: _uid});
        return d;
    }catch(e){
        console.log("-------------------------------\n"+
                    "Error @ Fetching User Notifications\n"+
                    "-------------------------------");
        return {};
    }
}

module.exports.addSubscription = async (_s) => {
    let _sub = new sub({
        uid: _s.uid,
        sid: _s.sid,
        pid: _s.pid
    })
    _sub.save(function(error, response){
        if(error){
            console.log("-------------------------------\n"+
                        "Error @ Subscription Insertion\n"+
                        "-------------------------------");
            return true;
        }else{
            return false;
        }
    })
}

module.exports.getSubscription = async (_sid) =>{
    try{
        let d = await sub.find({sid: _sid});
        return d;
    }catch(e){
        console.log("-------------------------------\n"+
                    "Error @ Subscription Fetching\n"+
                    "-------------------------------");
        return {};
    }
}

module.exports.getUserSubscriptions = async(_uid) =>{
    try{
        let d = await sub.find({uid: _uid});
        return d;
    }catch(e){
        console.log("-------------------------------\n"+
                    "Error @ User Subscriptions Fetching\n"+
                    "-------------------------------");
        return {};
    }
}


module.exports.addCart = async (_d) => {
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

module.exports = function(mongoose){
    let Carts = new mongoose.Schema({
        name: {type: String, required:true},
        code: {type: String, required:true},
        price: {type: Number, required:true},
        dateofwithdrawl: {type: Date, required:true},
        seller: {type: String, required:true},
        category: {type: String, required:true},
        photo: {type: String, required:true}
    }, {collection: 'Products', versionKey: false});
    return mongoose.model('Carts', Carts);
};
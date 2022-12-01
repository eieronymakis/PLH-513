const express = require('express');
const router = express.Router();
const {mongo} = require('../tools/mongo-connection');

router
    .route('/')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            res.render('products');
        }else{
            res.redirect('/login');
        }
    })

router
    .route('/all')
    .get(async (req,res) => {
    	const Products = mongo.model('Products',{
    		name: {type: String},
    		pcode: {type: String},
    		price: {type: Number},
    		dateofwithdrawl: {type: Date},
    		sellername: {type: String},
    		category: {type: String},
    		photo: {type: String}
    	});
    	Products.find({}, function (err, docs){
    		if(err){
    			console.log(err);
    		}else{
    			res.send(docs).status(200).end();
    		}
    	});
    });

router
    .route('/addtocart')
    .post(async (req, res) => {
        if(req.session.isAuthenticated){
            let query = `INSERT INTO carts(uid, pid, insertiondate) values (${req.session.uid},${req.body.pid},NOW())`;
            let result = await connection.executeQuery(query);
            res.status(200).end();
        }else{
            res.status(401).end();
        }
    })


router
    .route('/search')
    .get(async (req,res) => {
        if(req.session.isAuthenticated){
            let query = `SELECT * FROM products WHERE name LIKE '%${req.query.pname}%' AND sellername LIKE '%${req.query.sname}%' AND category LIKE '%${req.query.category}%' AND price BETWEEN ${req.query.pricelow} AND ${req.query.pricehigh} and dateofwithdrawl BETWEEN '${req.query.datelow}' AND '${req.query.datehigh}';`;
            let result = await connection.executeQuery(query);
            res.send(result).status(200).end();
        }else{
            res.status(401).end();
        }
    })
module.exports = router;

const mongo = require('mongoose');

mongo.connect('mongodb://127.0.0.1:27017/cloud_db');

module.exports = {
	mongo
}

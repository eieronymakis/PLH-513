const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use('/carts', require('./routes/carts'));
app.use('/subscriptions', require('./routes/subscriptions'));
app.use('/notifications', require('./routes/notifications'));

app.get('/', (req, res) => {
    res.status(200).send({
        Message:"Welcome to Data Storage API",
        Author:"EGI"
    }).end();
})

app.listen(process.env.PORT_LISTEN, err=> {
    if(err){
        return console.log("ERROR", err);
    }
    console.log(`API is listening on port ${process.env.PORT_LISTEN}`);
})

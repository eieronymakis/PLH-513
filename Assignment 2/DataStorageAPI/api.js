const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use('/carts', require('./routes/carts'));

app.get('/', (req, res) => {
    res.status(200).send({
        Message:"Welcome to Data Storage API",
        Author:"Emmanouil-Georgios Ieronymakis"
    }).end();
})

app.listen(process.env.PORT_LISTEN, err=> {
    if(err){
        return console.log("ERROR", err);
    }
    console.log(`API is listening on port ${process.env.PORT_LISTEN}`);
})

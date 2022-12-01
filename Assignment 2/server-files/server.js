const express = require('express');
const session = require('express-session');
const app = express();

require('dotenv').config();

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
      secure:false
    }
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

var cors = require('cors');
app.use(cors({
    origin: '*'
}));

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/img', express.static(__dirname+'public/img'));
app.use('/js', express.static(__dirname+'public/js'));

app.set('views','./views');
app.set('view engine','ejs');

/*Routes*/
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/auth', require('./routes/auth'));
app.use('/welcome', require('./routes/welcome'));
app.use('/logout', require('./routes/logout'));
app.use('/user', require('./routes/user'));
app.use('/forbidden', require('./routes/forbidden'));
app.use('/oops', require('./routes/oops'));
app.use('/products', require('./routes/products'));
app.use('/administration', require('./routes/administration'));
app.use('/cart', require('./routes/cart'));
app.use('/seller', require('./routes/seller'));

app.get('/', (req,res) => {
    res.redirect('/login');
})

app.use((req,res) => {
    res.redirect('/oops');
})

app.listen(process.env.PORT_LISTEN, err=> {
    if(err){
        return console.log("ERROR", err);
    }
    console.log(`Server is listening on port ${process.env.PORT_LISTEN}`);
})


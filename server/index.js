const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const {SERVER_PORT, SESSION_SECRET} = process.env;

const checkSess = require('./middlewares/checkForSession');//middleware

const sw = require('./controllers/swag_controllers');//controller
const ac = require('./controllers/auth.controller');//controller
const cc = require('./controllers/cart_controller');//controller
const s = require('./controllers/search_controller');//controller




const app = express();




app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkSess);
app.get('/api/swag', sw.read);//swag


app.post('/api/register', ac.register);//auth
app.post('/api/login', ac.login);//auth
app.post('/api/signout', ac.signout);//auth
app.get('/api/user', ac.getUser);//auth

app.post('/api/cart', cc.add);//auth
app.delete('/api/cart', cc.delete);//auth
app.post('/api/cart/checkout', cc.checkout);//auth


app.get('/api/search', s.search);//swag

























const port = SERVER_PORT||3004;
app.listen(SERVER_PORT, () => {
    console.log(`listening on port: ${SERVER_PORT}`);
    
});

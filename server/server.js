const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

let app = express();

app.use('*', cors()); // * only allow for LOCAL development
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/registerUser', (req,res) => {
    console.log('registerUser post request=', JSON.stringify(req.body));
    res.json({"message" : "user added succesfully"});
});

app.use('/', (req, res)=> {
    console.log('/ request');
    res.send('i am all ears!');
});

app.listen('8080', ()=> {
    console.log('i started listening to 8080');
});

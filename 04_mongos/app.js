//ENV
require('dotenv').config();

//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4500;

//Static File Service
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Use Node navtiv Promise
mongoose.Promise = global.Promise;

//
app.listen(port, () => console.log('Server listening on port ' + port));

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true })
	.then(() => console.log('Successfully connected to mongodb'))
	.catch(e => console.error(e));

//ROUTERS
app.use('/users', require('./routes/users'));



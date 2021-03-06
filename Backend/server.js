var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');

var app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.get('/', function(req,res){
  res.json({ message: 'Mongo Service is up! Hello world!'});
});

mongoose.connect('mongodb://localhost/tp2', { useMongoClient: true });
require('./models/equipo.js');
require('./models/partido.js');
require('./models/evento.js');
require('./models/tipo_evento.js');
require('./models/fecha.js');
require('./models/torneo.js');

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(require('./app/routes'));

var router=express.Router();


app.use(router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
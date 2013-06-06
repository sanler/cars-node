
/**
 * Module dependencies.
 */



var express = require('express')

  , http = require('http')
  , path = require('path');
var coches = require('./routes/coches');
var app = express();

app.use(express.bodyParser());

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', coches.home);

var car = [
    { car : 'Renault', model : 'Scenic'},
    { car : 'Nissan', model : 'micra'},
    { car : 'Ford', model : 'mondeo'}
];


app.get('/', function(req, res) {
    res.json(car);
});

app.get('/cars/random', function(req, res) {
    var id = Math.floor(Math.random() * car.length);
    var q = car[id];
    res.json(q);
});

app.get('/cars', function(req, res) {
    //var id = Math.floor(Math.random() * car.length);
    var q = car[0];
    res.json(q);
});

app.get('/cars/:id', function(req, res) {
    if(car.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No car found');
    }

    var q = car[req.params.id];
    res.json(q);
});

app.post('/cars', function(req, res) {
    if(!req.body.hasOwnProperty('car') ||
        !req.body.hasOwnProperty('model')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var newCar = {
        car : req.body.car,
       model : req.body.model
    };

    car.push(newCar);
    res.json(true);
});

app.put('/cars/:id', function(req, res) {
    if(!req.body.hasOwnProperty('car') ||
        !req.body.hasOwnProperty('model')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var newCar = {
        car : req.body.car,
        model : req.body.model
    };

    car.push(newCar);
    res.json(true);
});

app.delete('/cars/:id', function(req, res) {
    if(car.length <= req.params.id) {
        res.statusCode = 404;
        return res.send('Error 404: No quote found');
    }

    car.splice(req.params.id, 1);
    res.json(true);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

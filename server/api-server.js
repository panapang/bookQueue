var express = require('express');
var bodyParser = require('body-parser');
var Datastore = require('nedb');

var app = express();
var db = new Datastore({ filename: 'restaurant.db', autoload: true });

var sanitizeTitle = function (title) {
    // http://stackoverflow.com/a/7764370/349353
    return title.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
};

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

app.post('/promotions/', function (req, res) {
    let data = req.body;
    data['table'] = 'promotions';

    db.insert(data, function (err, newDoc) {
        res.json(newDoc);
    })
});

app.get('/promotions/', function (req, res) {
    db.find({ table: 'promotions' }).sort({ id: 1 }).exec(function (err, docs) {
        if (err) {
            res.statusCode = 404;
            res.json(err);
        };

        res.json(docs);
    });
});

app.get('/restaurant/', function (req, res) {
    db.find({ table: 'restaurant' }).exec(function (err, docs) {
        if (err) {
            res.statusCode = 404;
            res.json(err);
        };

        res.json(docs[0]);
    });
});

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('API server listening at http://%s:%s', host, port);
});
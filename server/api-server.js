var express = require('express');
var bodyParser = require('body-parser');
var Datastore = require('nedb');

var app = express();
var db = new Datastore({ filename: 'restaurant.db', autoload: true });

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

app.post('/promotions/:id', function (req, res) {
    let data = req.body;
    if (data._id !== req.params.id) {
        res.statusCode = 404;
        res.json(err);
    }

    db.update({ _id: data._id }, { $set: data }, function (err, newDoc) {
        res.json(newDoc);
    })
});

app.delete('/promotions/:id', function (req, res) {
    db.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
        res.json(numRemoved);
    });
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

app.get('/promotions/:id', function (req, res) {
    db.findOne({ table: 'promotions', _id: req.params.id }).sort({ id: 1 }).exec(function (err, docs) {
        if (err) {
            res.statusCode = 404;
            res.json(err);
        };

        res.json(docs);
    });
});

app.get('/restaurant/', function (req, res) {
    db.findOne({ table: 'restaurant' }).exec(function (err, docs) {
        if (err) {
            res.statusCode = 404;
            res.json(err);
        };

        res.json(docs);
    });
});

app.post('/reserve/', function (req, res) {
    const data = req.body;
    db.findOne(
        {
            table: 'table',
            minCust: { $lte: data.guests },
            maxCust: { $gte: data.guests },
            isReserved: false
        },
        {
            minCust: 0,
            maxCust: 0
        }
    ).exec(function (err, docs) {
        if (err) {
            res.statusCode = 404;
            res.json(err);
        };

        if (docs && docs._id) {
            //overide
            docs['isReserved'] = true;

            //set
            docs['reserved'] = {
                guests: data.guests,
                checkin: new Date()
            };

            db.update({ _id: docs._id }, { $set: docs });

            docs['isFull'] = false;

            res.json(docs);
        } else {
            res.json({ isFull: true });
        }
    });
});

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('API server listening at http://%s:%s', host, port);
});
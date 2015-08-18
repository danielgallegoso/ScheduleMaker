/**
 * Created by danielgallegos on 7/24/15.
 */
var express = require('express');
//var path = require('path');
var bodyParser = require('body-parser');

var app = express();


app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/views/index.html');
});

app.listen(8080);

console.log('Listening on localhost:8080');

var http = require('http');

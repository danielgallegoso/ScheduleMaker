/**
 * Created by danielgallegos on 7/24/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var LodashTemplates = require('lodash-express');
var utils = require('./tools/utils');
var angularRoute = require('./routes/angularRoute');
var usersRoute = require('./routes/usersRoute');


var app = express();


LodashTemplates(app, 'html');
app.set('views', process.cwd() + '/app/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());



app.use('/v1/users', usersRoute.getRoutes());
app.use('/', angularRoute.getRoutes());
app.use(function(request, response) {
    utils.sendError(404, '[Error] Whoops, the page you\'re looking for doesn\'t exist! :\'( ', response);
});



app.listen(8080);
console.log('Listening on localhost:8080');
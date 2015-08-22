/**
 * Created by danielgallegos on 8/19/15.
 */
var express = require('express');

exports.getRoutes = function () {
    var router = express.Router();

    router.get('/employee', function (request, response) {
        response.render('employeePreference');
    });

    router.get('/', function (request, response) {
        return response.render('index');
    });

    return router;
};
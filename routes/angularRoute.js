/**
 * Created by danielgallegos on 8/19/15.
 */
var express = require('express');

exports.getRoutes = function() {
    var router = express.Router();

    router.get('/', function(req, res) {
        return res.render('index');
    });

    return router;
};
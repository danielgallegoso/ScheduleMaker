/**
 * Created by danielgallegos on 8/18/15.
 */
// Modules
var express = require('express');
var utils = require('../tools/utils');
var categoryService = require('../services/categoriesService');

exports.getRoutes = function() {
    var router = express.Router();

    router.get('/', function(req, res) {
        console.log('[', new Date(), ']\t', req.method, req.baseUrl);

        categoryService.getCategories(req.query, function(err, data) {
            if(err) {
                utils.sendError(500, 'The server encountered an error while retrieving the categories', res);
                return;
            }

            res.send(data);
        });
    });

    return router;
};

/**
 * Created by danielgallegos on 8/18/15.
 */
var express = require('express');
var utils = require('../tools/utils');
var usersService = require('../services/usersService');



exports.getRoutes = function() {
    var router = express.Router();

    router.get('/login', function(request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        usersService.login(request, function(error, data) {
            if(error) {
                utils.sendError(500, 'Incorrect password or username.', response);
                return;
            }

            response.send(data);
        });
    });

    router.get('/create', function(request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        usersService.createUser(request, function(error) {
            if(error) {
                utils.sendError(500, 'Unable to create profile. Username taken.', response);
                return;
            }

            response.send();
        });
    });

    return router;
};

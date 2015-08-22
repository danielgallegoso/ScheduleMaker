/**
 * Created by danielgallegos on 8/22/15.
 */
var express = require('express');
var utils = require('../tools/utils');
var shiftsService = require('../services/shiftsService');


exports.getRoutes = function () {
    var router = express.Router();

    router.post('/', function (request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        shiftsService.saveShifts(request, function (error, data) {
            if (error) {
                utils.sendError(500, 'An error occurred posting shifts.', response);
                return;
            }

            response.send();
        });
    });

    router.get('/', function (request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        shiftsService.getShifts(request, function (error, data) {
            if (error) {
                utils.sendError(500, 'An error occurred retrieving shifts. Possibly wrong accessKey.', response);
                return;
            }

            response.send(data);
        });
    });

    router.delete('/', function (request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        shiftsService.resetShifts(request, function (error, data) {
            if (error) {
                utils.sendError(500, 'An error occurred deleting shifts from the database.', response);
                return;
            }

            response.send();
        });
    });

    return router;
};
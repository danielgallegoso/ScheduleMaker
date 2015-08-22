/**
 * Created by danielgallegos on 8/22/15.
 */
var express = require('express');
var utils = require('../tools/utils');
var employeesService = require('../services/employeesService');


exports.getRoutes = function () {
    var router = express.Router();

    router.post('/', function (request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        employeesService.saveEmployeePreferences(request, function (error, data) {
            if (error) {
                utils.sendError(500, 'An error occurred posting employee preferences. Possibly wrong accessKey.', response);
                return;
            }

            response.send();
        });
    });

    router.get('/', function (request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        employeesService.getEmployeePreferences(request, function (error, data) {
            if (error) {
                utils.sendError(500, 'An error occurred retrieving employee preferences.', response);
                return;
            }

            response.send(data);
        });
    });

    router.delete('/', function (request, response) {
        console.log('[', new Date(), ']\t', request.method, request.baseUrl + request.path);

        employeesService.resetEmployeePreferences(request, function (error, data) {
            if (error) {
                utils.sendError(500, 'An error occurred deleting employee preferences from the database.', response);
                return;
            }

            response.send(data);
        });
    });

    return router;
};
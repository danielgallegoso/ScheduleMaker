/**
 * Created by danielgallegos on 8/22/15.
 */
var employeesDao = require('../daos/employeesDao');
var usersDao = require('../daos/usersDao');
//var utils = require('../tools/utils');


exports.saveEmployeePreferences = function (request, callback) {
    var query = {};
    if (request.body.accessKey) query.accessKey = request.body.accessKey;
    if (request.body.token) query.token = request.body.token;
    usersDao.getId(query, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        employeesDao.saveEmployeePreferences(request.body.preferences, response._id, function(error, data) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, data);
        });
    });

};

exports.getEmployeePreferences = function (request, callback) {
    var query = {token: request.query.token};
    usersDao.getId(query, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        employeesDao.getEmployeePreferences(response._id, function (error, data) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, data);
        });
    });
};

exports.resetEmployeePreferences = function (request, callback) {
    var query = {token: request.query.token};
    usersDao.getId(query, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        employeesDao.resetEmployeePreferences(response._id, function (error, data) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, data);
        });
    });
};
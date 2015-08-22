/**
 * Created by danielgallegos on 8/22/15.
 */
var shiftsDao = require('../daos/shiftsDao');
var usersDao = require('../daos/usersDao');
//var utils = require('../tools/utils');


exports.saveShifts = function (request, callback) {
    var query = {token: request.body.token};
    usersDao.getId(query, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        shiftsDao.saveShifts(request.body.shifts, response._id, function (error, data) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, data);
        });
    });
};

exports.getShifts = function (request, callback) {
    var query = {};
    if (request.query.token) query.token = request.query.token;
    if (request.query.accessKey) query.accessKey = request.query.accessKey;
    usersDao.getId(query, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        shiftsDao.getShifts(response._id, function (error, data) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, data);
        });
    });
};

exports.resetShifts = function (request, callback) {
    var query = {token: request.query.token};
    usersDao.getId(query, function (error, response) {
        if (error) {
            callback(error, null);
            return;
        }

        shiftsDao.resetShifts(response._id, function (error, data) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, data);
        });
    });
};
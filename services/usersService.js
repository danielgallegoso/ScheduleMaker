/**
 * Created by danielgallegos on 8/18/15.
 */
var usersDao = require('../daos/usersDao');
var utils = require('../tools/utils');


exports.login = function (request, callback) {
    var user = {
        username: request.query.username,
        password: request.query.password
    };

    usersDao.login(user, callback);
};


exports.createUser = function (request, callback) {
    var salt = utils.randomString();
    var user = {
        username: request.query.username,
        password: utils.hash(request.query.password + salt),
        token: utils.randomString(),
        salt: salt
    };

    usersDao.createUser(user, function (error, data) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, data.token);
    });
};
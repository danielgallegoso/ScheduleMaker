/**
 * Created by danielgallegos on 8/18/15.
 */
var context = require('../models/context');
var utils = require('../tools/utils');
var User = context.User;


exports.login = function (params, callback) {
    User.findOne({username: params.username}).select('salt').exec(function (error, data) {
        if (error || !data) {
            callback(true, null);
            return;
        }

        var token = utils.randomString();
        params.password = utils.hash(params.password + data.salt);

        User.findOneAndUpdate(params, {$set: {token: token}}).select('token').exec(function (error, user) {
            if (error || !user) {
                callback(true, null);
                return;
            }

            callback(null, token);
        })
    });
};


exports.createUser = function (params, callback) {
    User(params).save(callback);
};


exports.authenticateToken = function (token, callback) {
    User.findOne({token: token}).select('username').exec(function (error, user) {
        if (error || !user) {
            callback(true, null);
            return;
        }

        callback(null, user);
    });
};
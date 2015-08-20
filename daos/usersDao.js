/**
 * Created by danielgallegos on 8/18/15.
 */
var context = require('../models/context');
var utils = require('../tools/utils');
var User = context.User;


exports.login = function (params, callback) {
    User
        .findOne({username: params.username}, function (error, data) {
            if (error || !data) {
                callback(true, null);
                return;
            }
            var token = utils.randomString();
            params.password = utils.hash(params.password + data.salt);
            User.findOneAndUpdate(params, {$set: {token: token}}, function (error, data) {
                if (error || !data) {
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
/**
 * Created by danielgallegos on 8/22/15.
 */
var context = require('../models/context');
//var utils = require('../tools/utils');
var Shift = context.Shift;


exports.saveShifts = function (shifts, id, callback) {
    Model.findOneAndUpdate({userId: id}, {userId: id, shifts: shifts}, callback);
};

exports.getShifts = function (id, callback) {
    Shift.find({userId: id}, function (error, data) {
        if (error || !data) {
            callback(true, null);
            return;
        }

        callback(null, data);
    });
};

exports.resetShifts = function (id, callback) {
    Shift.find({userId: id}).remove(callback);
};
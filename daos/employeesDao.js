/**
 * Created by danielgallegos on 8/22/15.
 */
var context = require('../models/context');
//var utils = require('../tools/utils');
var Employee = context.Employee;


exports.saveEmployeePreferences = function (preferences, id, callback) {
    var employees = [];
    preferences.forEach(function (preference) {
        preference.userId = id;
        employees.push(new Employee(preference));
    });

    Employee.create(employees, callback);
};

exports.getEmployeePreferences = function (id, callback) {
    Employee.find({userId: id}, function (error, data) {
        if (error || !data) {
            callback(true, null);
            return;
        }

        callback(null, data);
    });
};

exports.resetEmployeePreferences = function (id, callback) {
    Employee.find({userId: id}).remove(callback);
};
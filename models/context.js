/**
 * Created by danielgallegos on 8/19/15.
 */
// Modules
var mongoose = require('mongoose');

// Models
var UserModel = require('./user')(mongoose, mongoose.Schema);


var connect = function () {
    var options = {server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect('mongodb://localhost:27017/test', options);
};

mongoose.connection.on('error', function () {
    console.error('[', new Date(), ']\t', '[MongoDB] Cannot connect to the database');
});

mongoose.connection.on('disconnected', connect);

connect();


module.exports = {
    User: UserModel,
    Employee: EmployeeModel,
    Shift: ShiftModel
};

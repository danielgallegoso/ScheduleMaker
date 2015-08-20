/**
 * Created by danielgallegos on 8/19/15.
 */
// Modules
var Config = require('../config');
var mongoose = require('mongoose');

// Models
var ProductModel = require('./product')(mongoose, mongoose.Schema);
var CategoryModel = require('./category')(mongoose, mongoose.Schema);

module.exports = (function () {

    mongoose.connect(Config.MONGO_HOST);

    mongoose.connection.on('error', function (error) {
        if (error) {
            console.error('[', new Date(), ']\t', '[MongoDB] Cannot connect to the database (possible solution: check mongoose.connect(...))');
        }
        else {
            console.log('[', new Date(), ']\t', 'Connected successfully to the database');
        }
    });

    return {
        Product: ProductModel,
        Category: CategoryModel
    };

})();

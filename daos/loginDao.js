/**
 * Created by danielgallegos on 8/18/15.
 */
// Modules
var ProductModel = require('../models').Product;
var Config = require('../config');

// Retrieve data from siftr's db
exports.getVariations = function(params, callback) {

    var dbQuery = {
        variationId: params.variationId
    };

    ProductModel
        .find(dbQuery)
        .select(Config.PRODUCT_FIELDS)
        .exec(callback);
};

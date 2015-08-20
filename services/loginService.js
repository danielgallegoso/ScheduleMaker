/**
 * Created by danielgallegos on 8/18/15.
 */
// Modules
var cqmsDao = require('../daos/cqmsDao');

exports.exportToCQMS = function(req, callback) {

    cqmsDao.exportToCQMS(req.body.uuids, function(err) {
        if(err) {
            callback(err);
            return;
        }

        callback(null);
    });

};
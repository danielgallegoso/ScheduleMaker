/**
 * Created by danielgallegos on 8/19/15.
 */
var crypto = require('crypto');

exports.hash = function(str) {
    return crypto.createHash('sha256').update(str).digest("hex");
};


exports.randomString = function() {
    return crypto.randomBytes(8).toString('hex');
};


exports.sendError = function(errCode, errMsg, res) {
    var error = {
        code: errCode,
        msg: errMsg
    };

    console.error('[', new Date(), ']\t', error.msg);

    res.status(error.code).send(error).end();
};
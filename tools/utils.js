/**
 * Created by danielgallegos on 8/19/15.
 */
exports.sendError = function(errCode, errMsg, res) {
    var error = {
        code: errCode,
        msg: errMsg
    };

    console.error('[', new Date(), ']\t', error.msg);

    res.status(error.code).send(error).end();
};
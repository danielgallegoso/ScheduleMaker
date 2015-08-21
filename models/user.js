/**
 * Created by danielgallegos on 8/19/15.
 */
module.exports = function (mongoose, Schema) {

    var userSchema = new Schema({
        username: {type: String, required: true, index: {unique: true}},
        password: {type: String, required: true},
        salt: {type: String, required: true},
        token: {type: String, index: {unique: true}}
    });

    return mongoose.model('User', userSchema);
};
/**
 * Created by danielgallegos on 8/19/15.
 */
module.exports = function(mongoose, Schema) {

    var shiftSchema = new Schema({
        userId: {type: ObjectId, required: true},
        shifts: {type: Array, required: true}
    });

    return mongoose.model('Shift', shiftSchema);
};

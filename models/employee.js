/**
 * Created by danielgallegos on 8/19/15.
 */
module.exports = function(mongoose, Schema) {

    var employeeSchema = new Schema({
        userId: {type: ObjectId, required: true},
        name: {type: String, required: true},
        targetHours: {type: Number, required: true},
        availability: {type: Array, required: true}
    });

    return mongoose.model('Employee', employeeSchema);
};

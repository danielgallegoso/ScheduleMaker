/**
 * Created by danielgallegos on 8/19/15.
 */
module.exports = function(mongoose, Schema) {

    var categorySchema = new Schema({
        uuid: String,
        name: String,
        breadcrumb: String,
        parentBreadcrumB: String
    }, {
        collection: 'categories'
    });

    return mongoose.model('category', categorySchema);
};

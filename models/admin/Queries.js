const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Queries = new Schema({
    subject: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    }
});

const QueriesSchema = mongoose.model('queries', Queries);

module.exports = QueriesSchema;

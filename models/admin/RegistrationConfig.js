const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RegistrationConfig = new Schema({
    open: {
        type: Boolean,
        required: true,
        default: false
    },
    batch: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    }
});

const RegistrationConfigSchema = mongoose.model('config_registration', RegistrationConfig);

module.exports = RegistrationConfigSchema;

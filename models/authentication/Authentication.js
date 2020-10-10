const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthenticationSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    last_login: {
        type: Date
    },
    random_id: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    resend_link_time: {
        type: Date,
        default: Date.now()
    },
    otp: {
        type: String
    }
});

module.exports = Authentication = mongoose.model('authentication', AuthenticationSchema);

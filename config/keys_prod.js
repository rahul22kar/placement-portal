module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY,
    cvUploadPath: process.env.CV_UPLOAD_PATH,
    transporterEmail: process.env.TRANSPORTER_EMAIL,
    transporterPass: process.env.TRANSPORTER_PASS,
    adminUser: process.env.ADMIN_USERNAME,
    adminPass: process.env.ADMIN_PASSWORD,
    devEmails: process.env.DEV_EMAILS,
    apiEndpoint: process.env.API_ENDPOINT,
    adminMail: process.env.ADMIN_EMAIL,
    registerDeadline: process.env.REGISTER_DEADLINE
};
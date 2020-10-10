const multer = require('multer');
const keys = require('../config/keys');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Only PDFs are allowed'), false);
    }
};

const localCVUpload = multer({
    fileFilter,
    limits: {
        fileSize: 2048000
    },
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, keys.cvUploadPath);
        },
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        filename: function (req, file, cb) {
            if (!req.headers.index) req.headers.index = 0;
            let filename = '';
            if (req.headers.filename && req.headers.fileindex) {
                if (parseInt(req.headers.fileindex.split(',')[req.headers.index]) === 0) {
                    filename = req.headers.filename.split(',')[parseInt(req.headers.fileindex.split(',')[req.headers.index])] + '.pdf';
                }
                else {
                    filename = req.headers.filename.split(',')[parseInt(req.headers.fileindex.split(',')[req.headers.index])];
                }
                req.headers.index++;
            } else {
                filename = req.user.random_id + '-' + (req.headers.index++) + '.pdf';
            }
            cb(null, filename);
        }
    })
});

module.exports = {
    localCVUpload: localCVUpload
};
const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const keys = require('../../config/keys');
const mongoose = require('mongoose');

const CompanyProfiles = require('../../models/company/ProfileSchema');
const JobProfiles = require('../../models/company/JobSchema');
const Student = require('../../models/students/Students');

const validation = require('../../utils/validation/company');
const constants = require('../../utils/constants');
/*
    Upload configuration
aws.config.update({
    secretAccessKey: keys.awsSecretAccessKey,
    accessKeyId: keys.awsAccessKeyId,
    region: keys.s3region
});

const s3 = new aws.S3();

const contractFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Only PDFs are allowed'), false);
    }
};

const logoFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Only JPEGs are allowed'), false);
    }
};

const uploadContract = multer({
    contractFileFilter,
    storage: multerS3({
        s3,
        bucket: keys.s3bucketName,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            let fileName = req.user.email.split('@')[0].split('.')[0] + '_' + req.user.random_id ;
            cb(null, 'contract/' + fileName + '.pdf');
        },
        contentType: (req, file, cb) => {
            cb(null, file.mimetype ? file.mimetype : multerS3.AUTO_CONTENT_TYPE);
        },
        contentDisposition: 'attachment'
    })
});

const uploadLogo = multer({
    logoFileFilter,
    storage: multerS3({
        s3,
        bucket: keys.s3bucketName,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            let fileName = req.user.email.split('@')[0].split('.')[0] + '_' + req.user.random_id ;
            cb(null, 'logo/' + fileName + '.jpg');
        },
        contentType: (req, file, cb) => {
            cb(null, file.mimetype ? file.mimetype : multerS3.AUTO_CONTENT_TYPE);
        },
        contentDisposition: 'attachment'
    })
});

const contractFileUpload = uploadContract.single('contract');

const logoFileUpload = uploadLogo.single('logo');
*/

/*
 Route:         POST api/company/create_profile
 Description:   Create Company Profile
 Access:        Private
*/

router.post('/create_profile', passport.authenticate('jwt', {session: false}), (req,res) => {
    if (req.user.role !== 'company'){
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const inputValues = {
            email: req.user.email,
            ...req.body
        };

        const {errors, isValid} = validation.createProfileValidator(inputValues);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            CompanyProfiles.findOne({email: inputValues.email}).exec()
                .then(doc => {
                    if (!doc) {
                        inputValues.created_date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
                        inputValues.last_modified_date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
                        const newCompanyProfile = CompanyProfiles(inputValues);
                        newCompanyProfile.save().then((doc) => {
                            return res.status(201).json({
                                error: {},
                                success: true
                            })
                        }).catch(err => {
                            return res.status(500).json({
                                error: {
                                    internal: err
                                },
                                success: false
                            })
                        })
                    } else {
                        return res.status(409).json({
                            error: {
                                already_exists: 'Profile already exists'
                            },
                            success: false
                        });
                    }
                })
                .catch(err => {
                    return res.status(500).json({
                        error: {
                            internal: err
                        },
                        success: false
                    })
                })
        }

    }
});

/*
 Route:         POST api/company/create_profile
 Description:   Create Company Profile
 Access:        Private
*/

router.post('/edit_profile', passport.authenticate('jwt', {session: false}), (req,res) => {
    if (req.user.role !== 'company'){
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const inputValues = {
            email: req.user.email,
            ...req.body
        };
        const {errors, isValid} = validation.createProfileValidator(inputValues);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            inputValues.last_modified_date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
            CompanyProfiles.findOne({email: inputValues.email})
                .then(doc => {
                    if (!doc) {
                            return res.status(404).json({
                                error: {
                                    dne: 'Profile does not exist'
                                },
                                success: false
                            })
                    } else {
                        doc.company_name  = inputValues.company_name;
                        doc.company_introduction = inputValues.company_introduction;
                        doc.company_address = inputValues.company_address;
                        doc.company_specialization = inputValues.company_specialization;
                        doc.website = inputValues.website;
                        doc.contact_details = inputValues.contact_details;
                        doc.type_of_company = inputValues.type_of_company;
                        doc.last_modified_date = inputValues.last_modified_date;
                        doc.logo_link = inputValues.logo_link;
                        doc.save().then((doc) => {
                            return res.status(200).json({
                                error: {},
                                success: true
                            })
                        }).catch((err) => {
                            return res.status(500).json({
                                error: {
                                    internal: "Something went wrong, try again or contact administrator"
                                },
                                success: false
                            })
                        })
                    }
                })
                .catch(err => {
                    return res.status(500).json({
                        error: {
                            internal: err
                        },
                        success: false
                    })
                })
        }

    }
});

/*
 Route:         GET api/company/create_job
 Description:   Create Job
 Access:        Private
*/

router.post('/create_job', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'company') {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const inputValues = {
            email: req.user.email,
            ...req.body
        };
        const {errors, isValid} = validation.createJobValidator(inputValues);
        console.log(isValid);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            console.log(inputValues);
            inputValues.created_date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
            inputValues.last_modified_date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
            const newJobProfile = JobProfiles(inputValues);
            newJobProfile.save().then(doc => {
                return res.status(201).json({
                    error: {},
                    success: true
                })
            }).catch(err => {
                return res.status(500).json({
                    error: {
                        internal: err
                    },
                    success: false
                })
            })
        }
    }
});

/*
 Route:         GET api/company/fetch_profile
 Description:   Fetch profile details
 Access:        Private
*/

router.get('/fetch_profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        CompanyProfiles.findOne({email: req.user.email})
            .then(doc => {
                if (doc) {
                    if (doc.active_status === true) {
                        if (doc.approval_status === 1) {
                            return res.status(200).json({
                                error: {},
                                profileData: doc,
                                success: true
                            });
                        } else if (doc.approval_status === 0) {
                            return res.status(200).json({
                                error: {
                                    disapproved: 'Your profile is disapproved by admin. Make suggested changes'
                                },
                                success: false
                            });
                        } else {
                            return res.status(200).json({
                                error: {
                                    unapproved: 'Your profile is not approved by admin',
                                },
                                success: false
                            });
                        }
                    } else {
                        return res.status(401).json({
                            error: {
                                disabled: 'Your profile is disabled by admin. Contact placement cell'
                            },
                            success: false
                        })
                    }
                } else {
                    return res.status(404).json({
                        error: {
                            not_found: 'Profile does not exists'
                        },
                        success: false
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: {
                        internal: err
                    },
                    success: false
                })
            });
    }
});

/*
 Route:         POST api/company/upload_contract
 Description:   Upload Contract
 Access:        Private
*/

/*

router.post('/upload_contract', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        contractFileUpload(req, res, (err) => {
            if (err) {
                return res.status(422).json({
                    error: {
                        format: err.message
                    },
                    success: false
                });
            } else {
                if (req.file) {
                    return res.status(200).json({
                        error: {},
                        contract_link: req.file.location,
                        success: true
                    });
                } else {
                    return res.status(422).json({
                        error: {
                            not_attached: 'No attachment found'
                        },
                        success: false
                    });
                }
            }
        });
    }
});
*/
/*
 Route:         POST api/company/upload_logo
 Description:   Upload Logo
 Access:        Private
*/
/*
router.post('/upload_logo', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        logoFileUpload(req, res, (err) => {
            if (err) {
                return res.status(422).json({
                    error: {
                        format: err.message
                    },
                    success: false
                });
            } else {
                if (req.file) {
                    return res.status(200).json({
                        error: {},
                        logo_link: req.file.location,
                        success: true
                    });
                } else {
                    return res.status(422).json({
                        error: {
                            not_attached: 'No attachment found'
                        },
                        success: false
                    });
                }
            }
        });
    }
});
*/
/*
 Route:         GET api/company/jobs
 Description:   Find Jobs
 Access:        Private
*/

router.get('/jobs', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (!req.user.role === constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        JobProfiles.find({email: req.user.email, active: true})
        .then(jobs => {
            return res.status(200).json({
                error: {},
                success: true,
                jobProfiles: jobs
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: {
                    internal: err
                },
                success: false
            })
        })
    }
});

/*
 Route:         GET api/company/student_profiles
 Description:   Get student profiles
 Access:        Private
*/

router.get('/student_profiles', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (!req.user.role === constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        Student.find({approval_status: 1})
            .then(studentProfiles => {
                return res.status(200).json({
                    error: {},
                    success: true,
                    studentProfiles
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: {
                        internal: err
                    },
                    success: false
                })
            })
    }
});

/*
 Route:         POST api/company/edit_job
 Description:   Edit Job profile
 Access:        Private
*/

router.post('/edit_job', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const inputValues = {
            email: req.user.email,
            ...req.body
        };
        const {errors, isValid} = validation.createJobValidator(inputValues);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            inputValues.last_modified_date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
            JobProfiles.findByIdAndUpdate(inputValues.job_id, inputValues).exec()
                .then(doc => {
                    if (doc) {
                            return res.status(200).json({
                                error: {},
                                success: true
                            })
                    } else {
                        return res.status(404).json({
                            error: {
                                dne: 'Profile does not exists'
                            },
                            success: false
                        });
                    }
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: {
                            internal: err
                        },
                        success: false
                    })
                })
        }
    }
});

/*
    Route:         POST api/company/delete_job
    Description:   Delete existing job
    Access:        Private
 */
router.post('/delete_job', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        JobProfiles.findByIdAndUpdate(req.body.job_id,{active: false}).exec()
            .then(doc => {
                return res.status(200).json({
                    error: {},
                    success: true
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    error: {
                        internal: err
                    },
                    success: false
                })
            })
    }
});

/*
    Route:         GET api/company/applicants/:id
    Description:   Get list of people who have applied for particular job.
    Access:        Private
 */

router.get('/applicants/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== constants.ROLE_TYPES.COMPANY) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        JobProfiles.findById(req.params.id).select({"applicants": "1", "_id": "0"}).then(foundJob => {
            let applicantIds = [];
            foundJob.applicants.map(app => {
                applicantIds.push(mongoose.Types.ObjectId(app))
            });
            Student.find({"_id": { $in: applicantIds}}).exec().then(fetchedStudentDocs)
        });
    }
});

module.exports = router;

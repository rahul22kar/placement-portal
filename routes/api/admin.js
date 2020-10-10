const express = require('express');
const router = express.Router();
const passport = require('passport');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const archiver = require('archiver');
const fs = require('fs');

const validation = require('../../utils/validation/admin');
const Authentication = require('../../models/authentication/Authentication');
const Students = require('../../models/students/Students');
const ProfileSchema = require('../../models/company/ProfileSchema');
const AnnouncementsSchema = require('../../models/admin/Announcements');
const constants = require('../../utils/constants');
const mailservice = require('../../utils/mailservice');
const keys = require('../../config/keys');

/*
Setting up Excel worksheet
 */
const Excel = require('exceljs');


/*
    Create Company Login
 */
router.post('/create_company_login', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const inputValues = {
            ...req.body
        };
        const {errors, isValid} = validation.createLoginValidator(inputValues);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            Authentication.findOne({email: req.body.email}).then(doc => {
                if (doc) {
                    return res.status(409).json({
                        error: {
                            email: "Company credentials already exists"
                        },
                        success: false
                    })
                } else {
                    let data = req.body;
                    data.role = constants.ROLE_TYPES.COMPANY;
                    data.verified = true;
                    data.random_id = uuidv4();
                    bcrypt.genSalt(10, (genSaltErr, salt) => {
                        if (!genSaltErr) {
                            bcrypt.hash(data.password, salt, (hashErr, hashVal) => {
                                if (!hashErr) {
                                    data.password = hashVal;
                                    const newAuth = new Authentication(data);
                                    newAuth.save().then(resDoc => {
                                        return res.status(201).json({
                                            errors: {},
                                            success: true
                                        });
                                    }).catch(saveErr => {
                                        return res.status(500).json({
                                            error: {
                                                internal: "Could not register. Please contact administrator"
                                            },
                                            success: false
                                        });
                                    })
                                } else {
                                    return res.status(500).json({
                                        error: {
                                            internal: "Could not register. Please contact maintainer"
                                        },
                                        success: false
                                    });
                                }
                            })
                        } else {
                            return res.status(500).json({
                                error: {
                                    internal: "Could not register. Please contact maintainer"
                                },
                                success: false
                            });
                        }
                    })
                }
            }).catch(err => {
                return res.status(500).json({
                    error: {
                        internal: "Could not register. Please contact maintainer"
                    },
                    success: false
                });
            });
        }
    }
});

/*
    Get Student Profiles
 */

router.get('/student_profiles', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        Students.find({}).sort({'created_date': -1}).exec().then(fetchedData => {
            return res.status(200).json({
                error: {},
                data: fetchedData,
                success: true
            })
        }).catch(err => {
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
    Approve Student Profile
 */

router.put('/approve_student_profile/:id/:email', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        Students.findOneAndUpdate({"_id": req.params.id}, {$set: { 'approval_status': 1 }}, { useFindAndModify: false }).exec().then(successResponse => {
            mailservice.sendApprovalMail(req.params.email);
            return res.status(200).json({
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
        });
    }
});

/*
 Disapprove Student Profile
 */

router.put('/disapprove_student_profile/:id/:email', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        if (req.body.hasOwnProperty("suggested_changes")) {
            Students.findOneAndUpdate({"_id": req.params.id}, {$set: {'approval_status': 0}}, {useFindAndModify: false}).exec().then(successResponse => {
                mailservice.sendDisapprovalMail(req.params.email, req.body.suggested_changes);
                return res.status(200).json({
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
            });
        } else {
            return res.status(422).json({
                error: {
                    changes: "Suggested changes is required "
                },
                success: false
            })
        }
    }
});

/*
    Approve Student CV
 */

router.put('/approve_student_cv/:student_id/:cv_id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        Students.findById(req.params.student_id).exec().then(foundDoc => {
            if(foundDoc) {
                let cvDoc = foundDoc.cv.id(req.params.cv_id);
                if(!cvDoc) {
                    return res.status(404).json({
                        error: {
                            cv_not_found: "CV Does not exists"
                        },
                        success: false
                    });
                }
                else {
                    cvDoc.approved = 1;
                    foundDoc.save().then(savedDoc => {
                        return res.status(200).json({
                            error: {},
                            success: true
                        })
                    }).catch(saveError => {
                        return res.status(500).json({
                            error: {
                                internal: "Something went wrong. Contact maintainer"
                            },
                            success: true
                        })
                    })
                }
            }
            else {
                return res.status(404).json({
                    error: {
                        not_found: "Invalid Student"
                    },
                    success: false
                })
            }
        }).catch(err => {
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
 Disapprove Student CV
 */

router.put('/disapprove_student_cv/:student_id/:cv_id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        Students.findById(req.params.student_id).exec().then(foundDoc => {
            if(foundDoc) {
                let cvDoc = foundDoc.cv.id(req.params.cv_id);
                if(!cvDoc) {
                    return res.status(404).json({
                        error: {
                            cv_not_found: "CV Does not exists"
                        },
                        success: false
                    });
                }
                else {
                    cvDoc.approved = 0;
                    foundDoc.save().then(savedDoc => {
                        return res.status(200).json({
                            error: {},
                            success: true
                        })
                    }).catch(saveError => {
                        return res.status(500).json({
                            error: {
                                internal: "Something went wrong. Contact maintainer"
                            },
                            success: true
                        })
                    })
                }
            }
            else {
                return res.status(404).json({
                    error: {
                        not_found: "Invalid Student"
                    },
                    success: false
                })
            }
        }).catch(err => {
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
    Activate Student Profile
 */

router.put('/activate_student_profile/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        Students.findOneAndUpdate({"_id": req.params.id}, {$set: { 'active_status': 1 }}, { useFindAndModify: false }).exec().then(successResponse => {
            return res.status(200).json({
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
        });
    }
});

/*
 Deactivate Student Profile
 */

router.put('/deactivate_student_profile/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        Students.findOneAndUpdate({"_id": req.params.id}, {$set: { 'active_status': 0 }}, { useFindAndModify: false}).exec().then(successResponse => {
            return res.status(200).json({
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
        });
    }
});


/*
    Get Company Profiles
 */

router.get('/company_profiles', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        ProfileSchema.find().exec().then(fetchedData => {
            return res.status(200).json({
                error: {},
                data: fetchedData,
                success: true
            })
        }).catch(err => {
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
    Approve Company Profile
 */

router.put('/approve_company_profile/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        ProfileSchema.findOneAndUpdate({"_id": req.params.id}, {$set: { 'approval_status': 1 }}, { useFindAndModify: false}).exec().then(successResponse => {
            return res.status(200).json({
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
        });
    }
});

/*
 Disapprove Company Profile
 */

router.put('/disapprove_company_profile/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        ProfileSchema.findOneAndUpdate({"_id": req.params.id}, {$set: { 'approval_status': 0 }}, { useFindAndModify: false}).exec().then(res => {
            return res.status(200).json({
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
        });
    }
});

/*
 Create Announcement
 */

router.post('/create_announcement', passport.authenticate('jwt', {session:false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        const { errors, isValid } = validation.createAnnouncementValidator(req.body);
        if(!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        }
        else {
            const announcement = new AnnouncementsSchema(req.body);
            announcement.save().then(saveRes => {
                return res.status(200).json({
                    error: {},
                    success: true
                })
            }).catch(err => {
                return res.status(500).json({
                    error: {
                        internal: "Something went wrong. Contact developers"
                    },
                    success: false
                })
            })
        }
    }
});

/*
 Disable Student Profile
 */

router.put('/disable_student_profile/:id/:email', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        if (req.body.hasOwnProperty("reason")) {
            Students.findOneAndUpdate({"_id": req.params.id}, {$set: {'active_status': false}}, {useFindAndModify: false}).exec()
            .then(successResponse => {
                mailservice.sendDisableMail(req.params.email, req.body.reason);
                return res.status(200).json({
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
            });
        } else {
            return res.status(422).json({
                error: {
                    changes: "Reason is required "
                },
                success: false
            })
        }
    }
});

/*
 Enable Student Profile
 */

router.put('/enable_student_profile/:id/:email', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        Students.findOneAndUpdate({"_id": req.params.id}, {$set: {'active_status': true}}, {useFindAndModify: false}).exec()
            .then(successResponse => {
                mailservice.sendEnableMail(req.params.email);
                return res.status(200).json({
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
        });
    }
});

router.post('/download_data', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role !== constants.ROLE_TYPES.ADMIN) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    }
    else {
        if (req.body.hasOwnProperty('list')){
            Students.find({'_id': {$in: req.body.list}}).exec()
                .then(doc => {
                    let excelFile = fs.createWriteStream('/tmp/Excel_Data.xlsx');
                    let zipFile = fs.createWriteStream('/tmp/Student_Data.zip');
                    let archive = archiver('zip',{store: true});
                    zipFile.on('error', (err) => {
                        throw err;
                    });
                    zipFile.on('close', function() {
                        return res.status(200).download('/tmp/Student_Data.zip')
                    });
                    archive.pipe(zipFile);
                    //
                    // doc.forEach(student => {
                    //     student.cv.every(cv => {
                    //         if(cv.approved === 1){
                    //             archive.append(fs.createReadStream( keys.cvUploadPath + '/' +cv.link.split('/')[3]), { name: `/cv/${student.roll_number}_${student.first_name}_${student.last_name}`+'.pdf'});
                    //             return false
                    //         } else {
                    //             return true
                    //         }
                    //     })
                    // });

                    let workbook = new Excel.Workbook();
                    let worksheet = workbook.addWorksheet('Student Data');

                    worksheet.columns = [
                        { header: 'Roll Number', key: 'roll_number', width: 12 },
                        { header: 'First Name', key: 'first_name', width: 10 },
                        { header: 'Last Name', key: 'last_name', width: 10 },
                        { header: 'Gender', key: 'gender', width: 10},
                        { header: 'Email', key: 'email', width: 25},
                        { header: 'Branch', key: 'branch', width: 8},
                        { header: 'CPI', key: 'cpi', width: 5},
                        { header: 'Phone', key: 'phone_a', width: 12},
                        { header: 'Course', key: 'course_type', width: 8},
                        { header: 'Year of Study', key: 'year_of_study', width: 15},
                        { header: 'Year of Join', key: 'year_of_join', width: 15},
                        { header: 'D.O.B.', key: 'dob', width: 15},
                        { header: 'Address Line 1', key: 'address_line_a', width: 25},
                        { header: 'Address Line 2', key: 'address_line_b', width: 25},
                    ];

                    worksheet.addRows(doc);
                    workbook.xlsx.writeFile('/tmp/Excel_Data.xlsx')
                        .then(() => {
                            archive.append(fs.createReadStream( '/tmp/Excel_Data.xlsx'), { name: 'ExcelData.xlsx'});
                            archive.finalize();
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: {
                                    internal: "Something went wrong. Contact developers",
                                },
                                success: false
                            })
                        })
                })
        } else {
            return res.status(400).json({
                error:{
                    noList: "List needed to download data"
                },
                success: false
            })
        }
    }

});

module.exports = router;

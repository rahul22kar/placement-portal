const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const moment = require('moment');

const Students = require('../../models/students/Students');
const JobSchema = require('../../models/company/JobSchema');
const AnnouncementSchema = require('../../models/admin/Announcements');
const Authentication = require('../../models/authentication/Authentication');

const validation = require('../../utils/validation/students');
const constants = require('../../utils/constants');
const mailservice = require('../../utils/mailservice');
const uploadservice = require('../../utils/uploadservice');


const cvUpload = uploadservice.localCVUpload.array('cv', 3);


/*
 Route:         POST api/students/create_profile
 Description:   Create Students profile
 Access:        Private
*/

router.post('/create_profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
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
            Students.findOne({email: inputValues.email}).exec()
                .then(doc => {
                    if (!doc) {
                        inputValues.created_date = new Date().toISOString();
                        inputValues.last_modified_date = new Date().toISOString();
                        const newStudentProfile = Students(inputValues);
                        newStudentProfile.save().then((doc) => {
                            return res.status(201).json({
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
                            internal: "Something went wrong, try again or contact administrator"
                        },
                        success: false
                    })
                });
        }
    }
});

/*
 Route:         POST api/students/edit_profile
 Description:   Edit Students profile
 Access:        Private
*/

router.post('/edit_profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
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
        const {errors, isValid} = validation.editProfileValidator(req.query.type, inputValues);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            Students.findOne({email: inputValues.email}).exec()
                .then(doc => {
                    if (doc) {
                        doc.last_modified_date = new Date().toISOString();
                        if (req.query.type === 'basic') {
                            if(doc.approval_status === 0) {
                                doc.approval_status = -1
                            }
                            doc.first_name = inputValues.first_name;
                            doc.middle_name = inputValues.middle_name ? inputValues.middle_name : '';
                            doc.last_name = inputValues.last_name;
                            doc.dob = new Date(inputValues.dob);
                            doc.gender = inputValues.gender;
                            doc.address_line_a = inputValues.address_line_a;
                            doc.address_line_b = inputValues.address_line_b;
                            doc.phone_a = inputValues.phone_a;
                            doc.phone_b = inputValues.phone_b;
                        } else if (req.query.type === 'academic') {
                            if(doc.approval_status === 0) {
                                doc.approval_status = -1
                            }
                            doc.course_type = inputValues.course_type;
                            doc.year_of_study = inputValues.year_of_study;
                            doc.year_of_join = inputValues.year_of_join;
                            doc.branch = inputValues.branch;
                            doc.roll_number = inputValues.roll_number;
                            doc.cpi = inputValues.cpi;
                        } else if (req.query.type === 'professional') {
                            if(doc.approval_status === 0) {
                                doc.approval_status = -1
                            }
                            let mutatedArray = doc.cv;
                            inputValues.cv.map(item => {
                                let filename = item.link.split('/')[item.link.split('/').length - 1];
                                let index = parseInt(filename.split('-')[filename.split('-').length - 1]);
                                if(mutatedArray[index]) {
                                    mutatedArray[index].link = item.link;
                                    mutatedArray[index].approved = -1;
                                }
                                else {
                                    mutatedArray.push(item);
                                }
                            });
                            doc.interests = inputValues.interests;
                            doc.skills = inputValues.skills;
                            doc.cv = mutatedArray;
                        }
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
                    } else {
                        return res.status(404).json({
                            error: {
                                dne: 'Profile does not exists'
                            },
                            success: false
                        });
                    }
                })
                .catch(err => {
                    return res.status(500).json({
                        error: {
                            internal: "Something went wrong, try again or contact administrator"
                        },
                        success: false
                    })
                });
        }
    }
});

/*
 Route:         POST api/students/add_experience
 Description:   Add experience to profile
 Access:        Private
*/

router.post('/add_experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
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
        const {errors, isValid} = validation.addExperienceValidator(inputValues);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            Students.findOne({email: inputValues.email}).exec()
                .then(doc => {
                    if (doc) {
                        doc.last_modified_date = new Date().toISOString();
                        if (inputValues.active === true) {
                            inputValues.end_date = '';
                        }
                        doc.experience.push(inputValues);
                        doc.save().then(savedDoc => {
                            return res.status(200).json({
                                error: {},
                                success: true
                            })
                        }).catch(err => {
                            return res.status(500).json({
                                error: {
                                    internal: "Something went wrong, try again or contact administrator"
                                },
                                success: false
                            });
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
                .catch(err => {
                    return res.status(500).json({
                        error: {
                            internal: "Something went wrong, try again or contact administrator"
                        },
                        success: false
                    })
                });
        }
    }
});

/*
 Route:         PUT api/students/edit_experience
 Parameter:     ID
 Description:   Edit existing experience
 Access:        Private
*/

router.put('/edit_experience/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        if (req.user.role !== 'student' || req.user.verified !== true) {
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
            const {errors, isValid} = validation.addExperienceValidator(inputValues);
            if (!isValid) {
                return res.status(422).json({
                    error: errors,
                    success: false
                });
            } else {
                Students.findOne({email: req.user.email}).exec()
                    .then(doc => {
                        if (doc) {
                            let subDoc = doc.experience.id(req.params.id);
                            if (subDoc) {
                                subDoc.company_name = inputValues.company_name;
                                subDoc.experience_type = inputValues.experience_type;
                                subDoc.experience_location = inputValues.experience_location;
                                subDoc.description = inputValues.description;
                                subDoc.start_date = inputValues.start_date;
                                subDoc.end_date = inputValues.end_date;
                                subDoc.active = inputValues.active;
                                doc.last_modified_date = new Date().toISOString();
                                doc.save().then(savedDoc => {
                                    return res.status(200).json({
                                        error: {},
                                        success: true
                                    })
                                }).catch(err => {
                                    return res.status(500).json({
                                        error: {
                                            internal: "Something went wrong, try again or contact administrator"
                                        },
                                        success: false
                                    });
                                })
                            } else {
                                return res.status(404).json({
                                    error: {
                                        dnf: 'Experience not found'
                                    },
                                    success: false
                                })
                            }
                        } else {
                            return res.status(404).json({
                                error: {
                                    dne: 'Profile does not exists'
                                },
                                success: false
                            });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: {
                                internal: "Something went wrong, try again or contact administrator"
                            },
                            success: false
                        })
                    });
            }
        }
    }
);

/*
 Route:         DELETE api/students/remove_experience
 Parameter:     ID
 Description:   Remove experience from profile
 Access:        Private
*/

router.delete('/remove_experience/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        Students.findOne({email: req.user.email}).exec()
            .then(doc => {
                if (doc) {
                    let subDoc = doc.experience.id(req.params.id);
                    if (subDoc) {
                        subDoc.remove();
                        doc.last_modified_date = new Date().toISOString();
                        doc.save().then(savedDoc => {
                            return res.status(200).json({
                                error: {},
                                success: true
                            })
                        }).catch(err => {
                            return res.status(500).json({
                                error: {
                                    internal: "Something went wrong, try again or contact administrator"
                                },
                                success: false
                            });
                        })
                    } else {
                        return res.status(404).json({
                            error: {
                                dnf: 'Experience not found'
                            },
                            success: false
                        })
                    }
                } else {
                    return res.status(404).json({
                        error: {
                            dne: 'Profile does not exists'
                        },
                        success: false
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: {
                        internal: "Something went wrong, try again or contact administrator"
                    },
                    success: false
                })
            });
    }
});

/*
 Route:         POST api/students/add_project
 Description:   Add Project to profile
 Access:        Private
*/

router.post('/add_project', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
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
        const {errors, isValid} = validation.addProjectValidator(inputValues);
        if (!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        } else {
            Students.findOne({email: inputValues.email}).exec()
                .then(doc => {
                    if (doc) {
                        doc.last_modified_date = new Date().toISOString();
                        doc.projects.push(inputValues);
                        doc.save().then(savedDoc => {
                            return res.status(200).json({
                                error: {},
                                success: true
                            })
                        }).catch(err => {
                            return res.status(500).json({
                                error: {
                                    internal: "Something went wrong, try again or contact administrator"
                                },
                                success: false
                            });
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
                .catch(err => {
                    return res.status(500).json({
                        error: {
                            internal: "Something went wrong, try again or contact administrator"
                        },
                        success: false
                    })
                });
        }
    }
});

/*
 Route:         PUT api/students/edit_project
 Parameter:     ID
 Description:   Edit existing experience
 Access:        Private
*/

router.put('/edit_project/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        if (req.user.role !== 'student' || req.user.verified !== true) {
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
            const {errors, isValid} = validation.addProjectValidator(inputValues);
            if (!isValid) {
                return res.status(422).json({
                    error: errors,
                    success: false
                });
            } else {
                Students.findOne({email: req.user.email}).exec()
                    .then(doc => {
                        if (doc) {
                            let subDoc = doc.projects.id(req.params.id);
                            if (subDoc) {
                                subDoc.project_name = inputValues.project_name;
                                subDoc.guidance = inputValues.guidance;
                                subDoc.project_location = inputValues.project_location;
                                subDoc.description = inputValues.description;
                                subDoc.start_date = inputValues.start_date;
                                subDoc.end_date = inputValues.end_date;
                                subDoc.active = inputValues.active;
                                doc.last_modified_date = new Date().toISOString();
                                doc.save().then(savedDoc => {
                                    return res.status(200).json({
                                        error: {},
                                        success: true
                                    })
                                }).catch(err => {
                                    return res.status(500).json({
                                        error: {
                                            internal: "Something went wrong, try again or contact administrator"
                                        },
                                        success: false
                                    });
                                })
                            } else {
                                return res.status(404).json({
                                    error: {
                                        dnf: 'Project not found'
                                    },
                                    success: false
                                })
                            }
                        } else {
                            return res.status(404).json({
                                error: {
                                    dne: 'Profile does not exists'
                                },
                                success: false
                            });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: {
                                internal: "Something went wrong, try again or contact administrator"
                            },
                            success: false
                        })
                    });
            }
        }
    }
);

/*
 Route:         DELETE api/students/remove_project
 Parameter:     ID
 Description:   Remove experience from profile
 Access:        Private
*/

router.delete('/remove_project/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        Students.findOne({email: req.user.email}).exec()
            .then(doc => {
                if (doc) {
                    let subDoc = doc.projects.id(req.params.id);
                    if (subDoc) {
                        subDoc.remove();
                        doc.last_modified_date = new Date().toISOString();
                        doc.save().then(savedDoc => {
                            return res.status(200).json({
                                error: {},
                                success: true
                            })
                        }).catch(err => {
                            return res.status(500).json({
                                error: {
                                    internal: "Something went wrong, try again or contact administrator"
                                },
                                success: false
                            });
                        })
                    } else {
                        return res.status(404).json({
                            error: {
                                dnf: 'Project not found'
                            },
                            success: false
                        })
                    }
                } else {
                    return res.status(404).json({
                        error: {
                            dne: 'Profile does not exists'
                        },
                        success: false
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: {
                        internal: "Something went wrong, try again or contact administrator"
                    },
                    success: false
                })
            });
    }
});

/*
 Route:         GET api/students/check_profile
 Description:   Check if profile exists
 Access:        Private
*/


router.get('/check_profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        Students.findOne({email: req.user.email}).exec().then(doc => {
            if (doc) {
                return res.status(200).json({
                    error: {},
                    approval_status: doc.approval_status,
                    active_status: doc.active_status,
                    success: true
                });
            } else {
                return res.status(404).json({
                    error: {
                        not_found: 'Student profile not found'
                    },
                    success: false
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                error: {
                    internal: "Something went wrong, try again or contact administrator"
                },
                success: false
            });
        });
    }
});

/*
 Route:         GET api/students/fetch_profile
 Description:   Fetches profile data
 Access:        Private
*/

router.get('/fetch_profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        Students.findOne({email: req.user.email}, {"_id": 0}).exec()
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
                                profileData: doc,
                                success: false
                            });
                        } else {
                            return res.status(200).json({
                                error: {
                                    unapproved: 'Your profile is not approved by admin',
                                },
                                profileData: doc,
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
                        internal: "Something went wrong, try again or contact administrator"
                    },
                    success: false
                })
            });
    }
});

/*
Route:         POST api/students/upload_cv
Description:   Upload CV
Access:        Private
*/

router.post('/upload_cv', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        cvUpload(req, res, (err) => {
            if (err) {
                return res.status(422).json({
                    error: {
                        format: err.message
                    },
                    success: false
                });
            } else {
                if (req.files) {
                    let links = [];
                    req.files.map(file => {
                        let cvObject = {
                            link: keys.apiEndpoint + '/' + file.filename
                        };
                        links.push(cvObject);
                    });
                    return res.status(200).json({
                        error: {},
                        cv_link: links,
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

/*
Route:          PUT api/students/apply_job
Description:    Apply for Job using JOB_ID
Access:         Private
*/

router.put('/apply_job/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        JobSchema.findById(req.params.id).exec().then(fetchedJob => {
            if (!fetchedJob) {
                return res.status(404).json({
                    error: {
                        not_found: "Job not found"
                    },
                    success: false
                })
            } else {
                if (!req.body.hasOwnProperty('selected_cv')) {
                    return res.status(422).json({
                        error: {
                            not_attached: "CV Needs to be attached"
                        },
                        success: false
                    })
                } else {
                    if (fetchedJob.active) {
                        if (req.body.selected_cv.length === 0) {
                            return res.status(422).json({
                                error: {
                                    not_attached: "CV Needs to be attached"
                                },
                                success: false
                            })
                        } else {
                            Students.findOne({email: req.user.email}).exec().then(fetchedStudent => {
                                if (!fetchedStudent) {
                                    return res.status(400).json({
                                        error: {
                                            bad_request: "Something went wrong, contact administrator"
                                        },
                                        success: false
                                    })
                                } else {
                                    if (fetchedStudent.job_count >= constants.STUDENT_CONSTANTS.MAX_JOB_COUNT) {
                                        return res.status(422).json({
                                            error: {
                                                max_count_exceeded: "You have already applied for 5 jobs"
                                            },
                                            success: false
                                        });
                                    } else {
                                        let cvDoc = fetchedStudent.cv.id(req.body.selected_cv);
                                        if (cvDoc) {
                                            if (cvDoc.approved !== 1) {
                                                return res.status(422).json({
                                                    error: {
                                                        unapproved_cv: "CV Attached is not approved, kindly attach the one which is approved"
                                                    },
                                                    success: false
                                                });
                                            } else {
                                                let validBranch = false;
                                                fetchedJob.eligible_branches.map(branch => {
                                                    if(branch === fetchedStudent.branch) {
                                                        validBranch = true;
                                                    }
                                                });
                                                if(parseFloat(fetchedStudent.cpi) >= parseFloat(fetchedJob.minimum_cpi) && validBranch) {
                                                    fetchedStudent.job_applications.push(fetchedJob._id);
                                                    let currentJobCount = fetchedStudent.job_count;
                                                    fetchedStudent.job_count = currentJobCount + 1;
                                                    fetchedStudent.save().then(saveRes => {
                                                        let applicantDict = {
                                                            student_id: fetchedStudent._id
                                                        };
                                                        fetchedJob.applicants.push(applicantDict);
                                                        fetchedJob.save().then(jobSaveRes => {
                                                            return res.status(200).json({
                                                                error: {},
                                                                success: true
                                                            })
                                                        }).catch(jobSaveErr => {
                                                            return res.status(500).json({
                                                                error: {
                                                                    job_application: "Error in applying for job",
                                                                    server: jobSaveErr
                                                                },
                                                                success: false
                                                            })
                                                        })
                                                    })
                                                        .catch(saveErr => {
                                                            return res.status(500).json({
                                                                error: {
                                                                    job_application: "Error in applying for job",
                                                                    server: saveErr
                                                                },
                                                                success: false
                                                            })
                                                        })
                                                }
                                                else {
                                                    return res.status(409).json({
                                                        error: {
                                                            ineligible: "You are not eligible to apply for this job"
                                                        },
                                                        success: false
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                    else {
                        return res.status(400).json({
                            error: {
                                invalid_job: "Invalid Job"
                            },
                            success: false
                        })
                    }
                }
            }
        })
    }
});

/*
  Route:          POST api/students/report_bug
  Description:    Reports bug
  Access:         Private
*/

router.post('/report_bug', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const { errors, isValid } = validation.reportBugValidator(req.body);
        if(!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        }
        else {
            mailservice.reportBugMail(keys.devEmails, req.user.email, req.body.feature, req.body.bug_description);
            return res.status(200).json({
                error: {},
                success: true
            });
        }
    }
});

/*
  Route:          POST api/students/create_query
  Description:    Creates Query
  Access:         Private
*/

router.post('/create_query', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const { errors, isValid } = validation.createQueryValidator(req.body);
        if(!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        }
        else {
            mailservice.createQueryMail(keys.adminMail, req.user.email, req.body.subject, req.body.query);
            return res.status(200).json({
                error: {},
                success: true
            });
        }
    }
});

/*
  Route:          GET api/students/fetch_announcements
  Description:    Fetch list of announcements
  Access:         Private
 */

router.get('/fetch_announcements', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        if(!req.query.course_type || !req.query.year_of_study || !req.query.branch) {
            return res.status(422).json({
                error: {
                    invalid_input: "Invalid request"
                },
                success: false
            })
        }
        else {
            AnnouncementSchema.find({branch: req.query.branch, course_type: req.query.course_type, year_of_study: req.query.year_of_study}, ["subject", "description", "_id", "created_on"], {sort: { "created_on": -1}}).then((fetchedDoc) => {
                if(!fetchedDoc) {
                    return res.status(200).json({
                        error: {},
                        data: [],
                        success: true
                    })
                }
                else {
                    return res.status(200).json({
                        error: {},
                        data: fetchedDoc,
                        success: true
                    })
                }
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
    Route:        api/students/reset_password,
    Description:  Reset password.
    Access:       Private
 */

router.post('/reset_password', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        const { errors, isValid } = validation.resetPasswordValidator(req.body);
        if(!isValid) {
            return res.status(422).json({
                error: errors,
                success: false
            });
        }
        else {
            Authentication.findOne({email: req.user.email}).then(doc => {
                if (doc) {
                    bcrypt.genSalt(10, (genSaltErr, salt) => {
                        if (!genSaltErr) {
                            bcrypt.hash(req.body.password, salt, (hashErr, hashVal) => {
                                if (!hashErr) {
                                    doc.password = hashVal;
                                    doc.save().then(savedRes => {
                                        return res.status(200).json({
                                            error: {},
                                            success: true
                                        });
                                    });
                                }
                                else {
                                    return res.status(500).json({
                                        error: {
                                            internal: "Something went wrong. Please try again"
                                        },
                                        success: false
                                    })
                                }
                            });
                        }
                        else {
                            return res.status(500).json({
                                error: {
                                    internal: "Something went wrong. Please try again"
                                },
                                success: false
                            })
                        }
                    });
                } else {
                    return res.status(404).json({
                        error: {
                            not_found: "Invalid user"
                        },
                        success: false
                    });
                }
            });
        }
    }
});

/*
    Route:        api/students/download_cv
    Description:  Download
    Access:       Private
 */

router.get('/download_cv/:cv_name', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error: {
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        let file = keys.cvUploadPath + '/' + req.params.cv_name;
        res.download(file);
    }
});

/*
Route:          GET api/students/current_openings
Description:    Fetch list of current job openings
Access:         Private
*/

router.get('/current_openings', passport.authenticate('jwt', {session:false}), (req, res) => {
    if (req.user.role !== 'student' || req.user.verified !== true) {
        return res.status(401).json({
            error:{
                unauthorized: 'Unauthorized Access'
            },
            success: false
        });
    } else {
        JobSchema.find().exec()
            .then(jobs => {
                if (!jobs){
                    return res.status(200).json({
                        data: [],
                        success: true,
                        error: {}
                    })
                }
                else {
                    return res.status(200).json({
                        data: jobs,
                        success: true
                    })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: {
                        internal: "Something went wrong. Please try again"
                    },
                    success: false
                })
            })
    }
});

module.exports = router;

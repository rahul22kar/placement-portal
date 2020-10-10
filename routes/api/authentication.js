const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const Authentication = require('../../models/authentication/Authentication');

const validation = require('../../utils/validation/authentication');
const mailservice = require('../../utils/mailservice');
const constants = require('../../utils/constants');

const keys = require('../../config/keys');

const router = express.Router();


/*
 Route:         POST api/auth/register
 Description:   Registration route
 Access:        Public
*/
router.post('/register', (req, res) => {
    const {errors, isValid} = validation.registerValidator(req.body);
    if (!isValid) {
        return res.status(422).json({
            error: errors,
            success: false
        });
    } else {
        // Temporary block for registration
        let initials = req.body.email.split('@')[0].split('.').length >= 2 ? req.body.email.split('@')[0].split('.')[2] : 'unknown';
        let batch = initials.substr(0, 2);
        if(moment(new Date()).isAfter(moment(new Date(keys.registerDeadline))) && batch === '16') {
            return res.status(400).json({
                error: {
                    registeration_closed: "Registration for your batch is closed"
                },
                success: false
            })
        }
        else {
            Authentication.findOne({email: req.body.email}).then(doc => {
                if (doc) {
                    return res.status(409).json({
                        error: {
                            email: "Email already exists"
                        },
                        success: false
                    })
                } else {
                    let data = req.body;
                    data.role = constants.ROLE_TYPES.STUDENT;
                    data.random_id = uuidv4();
                    bcrypt.genSalt(10, (genSaltErr, salt) => {
                        if (!genSaltErr) {
                            bcrypt.hash(data.password, salt, (hashErr, hashVal) => {
                                if (!hashErr) {
                                    data.password = hashVal;
                                    const newAuth = new Authentication(data);
                                    newAuth.save().then(resDoc => {
                                        const jwtPayload = {
                                            email: resDoc.email
                                        };
                                        jwt.sign(jwtPayload, keys.secretOrKey, {expiresIn: "1h"}, (err, token) => {
                                            if (!err) {
                                                let url = keys.apiEndpoint + `/api/auth/confirm_email/${token}`;
                                                mailservice.sendConfirmationMail(data.email, url);
                                                return res.status(201).json({
                                                    errors: {},
                                                    success: true
                                                });
                                            } else {
                                                return res.status(500).json({
                                                    error: {
                                                        internal: "Could not register. Please contact administrator"
                                                    },
                                                    success: false
                                                });
                                            }
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
                                            internal: "Could not register. Please contact administrator"
                                        },
                                        success: false
                                    });
                                }
                            })
                        } else {
                            return res.status(500).json({
                                error: {
                                    internal: "Could not register. Please contact administrator"
                                },
                                success: false
                            });
                        }
                    })
                }
            }).catch(err => {
                return res.status(500).json({
                    error: {
                        internal: "Could not register. Please contact administrator"
                    },
                    success: false
                });
            });
        }
    }
});

/*
 Route:         POST api/auth/login
 Description:   Login route
 Access:        Public
*/

router.post('/login', (req, res) => {
    const {errors, isValid} = validation.loginValidator(req.body);
    if (!isValid) {
        return res.status(422).json({
            error: errors,
            success: false
        });
    } else {
        if (req.body.role === constants.ROLE_TYPES.ADMIN) {
            if (req.body.email !== keys.adminUser || req.body.password !== keys.adminPass) {
                return res.status(401).json({
                    error: {
                        unauthorized: 'Unauthorized Access Attempt'
                    }
                });
            }
            else {
                const jwtPayload = {
                    role: 'admin'
                };
                jwt.sign(jwtPayload, keys.secretOrKey, {expiresIn: '2h'}, (err, token) => {
                    return res.status(200).json({
                        token: token,
                        expiresIn: 2 * 60 * 60,
                        role: constants.ROLE_TYPES.ADMIN,
                        success: true
                    });
                });
            }
        } else {
            Authentication.findOne({email: req.body.email, role: req.body.role}).then(doc => {
                if (doc) {
                    bcrypt.compare(req.body.password, doc.password).then(result => {
                        if (result) {
                            if (doc.verified !== true) {
                                return res.status(401).json({
                                    error: {
                                        email: 'Email is not verified'
                                    },
                                    success: false
                                });
                            } else {
                                const jwtPayload = {
                                    email: doc.email,
                                    role: doc.role,
                                    verified: doc.verified
                                };
                                jwt.sign(jwtPayload, keys.secretOrKey, {expiresIn: "2h"}, (err, token) => {
                                    if (!err) {
                                        return res.status(200).json({
                                            token: token,
                                            expiresIn: 2 * 60 * 60,
                                            role: req.body.role,
                                            success: true
                                        });
                                    } else {
                                        return res.status(500).json({
                                            error: {
                                                internal: 'Could not login. Please contact administrator'
                                            },
                                            success: false
                                        });
                                    }
                                });
                            }
                        } else {
                            return res.status(401).json({
                                error: {
                                    password: 'The password entered is incorrect'
                                },
                                success: false
                            })
                        }
                    })
                } else {
                    return res.status(404).json({
                        error: {
                            email: "Account associated with this email and role is not found",
                        },
                        success: false
                    });
                }
            }).catch(err => {
                return res.status(500).json({
                    error: {
                        internal: "Could not login. Please contact administrator"
                    },
                    success: false
                });
            })
        }
    }
});
    
/*
    Route:         POST api/auth/resend_confirm_email
    Description:   Resend confirmation email
    Access:        Public
*/

router.post('/resend_confirm_email', (req, res) => {
    let errors = {};
    if (req.body.hasOwnProperty('email')) {
        let validMailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\\.)?[a-zA-Z]+\\.)?(iitgoa)\\.ac.in$");
        if (!validMailRegex.test(req.body.email)) {
            errors.email = "Invalid email input";
        }
    } else {
        errors.email = "Email field cannot be empty";
    }
    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            error: {
                email: errors.email
            },
            success: false
        });
    } else {
        Authentication.findOne({email: req.body.email}).then(doc => {
            if (doc) {
                let validRequest = moment(new Date()).diff(moment(doc.resend_link_time), 'h') > 1;
                let isStudent = doc.role === constants.ROLE_TYPES.STUDENT;
                let isVerified = doc.verified;
                if (validRequest && isStudent && !isVerified) {
                    const jwtPayload = {
                        email: req.body.email
                    };
                    jwt.sign(jwtPayload, keys.secretOrKey, {expiresIn: "1h"}, (err, token) => {
                        if (!err) {
                            let url = keys.apiEndpoint + `/api/auth/confirm_email/${token}`;
                            mailservice.sendConfirmationMail(req.body.email, url);
                            return res.status(200).json({
                                message: "Email successfully sent",
                                success: true
                            });
                        } else {
                            return res.status(500).json({
                                error: {
                                    internal: "Could not send confirmation email. Please contact administrator"
                                },
                                success: false
                            });
                        }
                    });
                } else {
                    return res.status(400).json({
                        error: {
                            invalid: "Invalid confirmation link request. Try again with correct details."
                        },
                        success: false
                    });
                }
            } else {
                return res.status(404).json({
                    error: {
                        email: "User does not exists"
                    },
                    success: false
                });
            }
        }).catch(err => {
            return res.status(500).json({
                error: {
                    internal: "Could not send confirmation email. Please contact administrator"
                },
                success: false
            });
        })
    }
});

/*
 Route:         GET api/auth/confirm_email
 Parameters:    token
 Description:   Confirm Email Address
 Access:        Public
*/

router.get("/confirm_email/:token", (req, res) => {
    let url = keys.apiEndpoint + `/email_confirmed`;
    jwt.verify(req.params.token, keys.secretOrKey, (err, payload) => {
        if (!err) {
            Authentication.findOne({email: payload.email})
                .then(doc => {
                    if (!doc.verified) {
                        doc.verified = true;
                        doc
                            .save()
                            .then(resDoc => res.redirect(url + "?status=true"))
                            .catch(resErr => res.redirect(url + "?status=false"));
                    } else {
                        return res.redirect(url + "?status=false");
                    }
                })
                .catch(authErr => {
                    return res.redirect(url + "?status=false");
                });
        } else {
            return res.redirect(url + "?status=false");
        }
    });
});

/*
    Route:        api/auth/send_otp,
    Description:  Generates OTP and mails it.
    Access:       Public
 */

router.post('/send_otp', (req, res) => {
    let errors = {};
    if (req.body.hasOwnProperty('email')) {
        let validMailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\\.)?[a-zA-Z]+\\.)?(iitgoa)\\.ac.in$");
        if (!validMailRegex.test(req.body.email)) {
            errors.email = "Invalid email input";
        }
    } else {
        errors.email = "Email field cannot be empty";
    }
    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            error: {
                email: errors.email
            },
            success: false
        });
    } else {
        Authentication.findOne({email: req.body.email}).then(doc => {
            if (doc) {
                let isStudent = doc.role === constants.ROLE_TYPES.STUDENT;
                let isVerified = doc.verified;
                if (isStudent && isVerified) {
                    let otp = 100000 + Math.ceil(Math.random()*900000);
                    bcrypt.genSalt(10, (genSaltErr, salt) => {
                        if (!genSaltErr) {
                            bcrypt.hash(otp.toString(), salt, (hashErr, hashVal) => {
                                if (!hashErr) {
                                    doc.password = hashVal;
                                    mailservice.sendOTPMail(req.body.email, otp);
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
                }
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
});

module.exports = router;

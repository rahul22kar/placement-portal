const ROLE_TYPES = {
    ADMIN: 'admin',
    STUDENT: 'student',
    COMPANY: 'company'
};

const STUDENT_CONSTANTS = {
    MAX_JOB_COUNT: 1000,
    COURSE_TYPE_CONSTANTS: {
        BTECH: "BTech",
        MTECH: "MTech",
        PHD: "PhD"
    },
    BRANCH_CONSTANTS: {
        ELECTRICAL: "ee",
        COMPUTERS: "cse",
        MECHANICAL: "me",
        MATHEMATICS: "mc"
    },
    YEAR_CONSTANTS: {
        FIRST: "1",
        SECOND: "2",
        THIRD: "3",
        FOURTH: "4",
        FIFTH: "5"
    }
};

module.exports = {
    ROLE_TYPES: ROLE_TYPES,
    STUDENT_CONSTANTS: STUDENT_CONSTANTS
};
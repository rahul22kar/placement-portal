export const branchToTextMap = {
    "cse": "Computer Science Engineering",
    "ee": "Electrical Engineering",
    "me": "Mechanical Engineering",
    "mc": "Mathematics and Computing"
};

export const branchFilterObject = Object.keys(branchToTextMap).map((key, value) => { return {text: branchToTextMap[key], value: key} });

export const yearToTextMap = {
    "1": "First Year",
    "2": "Second Year",
    "3": "Third Year",
    "4": "Fourth Year",
};

export const yearFilterObject = Object.keys(yearToTextMap).map((key, value) => { return { text: yearToTextMap[key], value: key}});

export const courseToTextMap = {
    "BTech": "B.Tech",
    "MTech": "M.Tech",
};

export const YEAR_CONSTANTS = {
    FIRST: "1",
    SECOND: "2",
    THIRD: "3",
    FOURTH: "4",
};

export const BRANCH_CONSTANTS = {
    ELECTRICAL: "ee",
    COMPUTERS: "cse",
    MECHANICAL: "me",
    MATHEMATICS: "mc"
};

export const COURSE_TYPE_CONSTANTS = {
    BTECH: "BTech",
    MTECH: "MTech",
};


let constants = {
    API_ENDPOINT: process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : "http://localhost:3000",
    AXIOS_TIMEOUT: 1000 * 10,
    CONN_ERROR: {
        error: {
            connection: 'Something went wrong, probably your internet connection. Please try again'
        }
    }
};

export default constants;

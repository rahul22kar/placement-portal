/*
    Dependencies
*/
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const keys = require('./config/keys');

/*
    Routes
*/
const authentication = require('./routes/api/authentication');
const students = require('./routes/api/students');
const admin = require('./routes/api/admin');
const company = require('./routes/api/company');

const app = express();

// BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//MongoDB connection setup
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Helmet middleware for protection
app.use(helmet());
// Compression for speed
app.use(compression());

// Use Routes
app.use(cors());
app.options('*', cors());
app.use('/api/auth', authentication);
app.use('/api/students', students);
/*
    Company Side temporarily removed.
*/
app.use('/api/company', company);
app.use('/api/admin', admin);

if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.use(express.static(keys.cvUploadPath));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

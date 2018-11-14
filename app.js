//Library Imports
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let Logger = require('./services/logger');
let fs = require('fs');
let mongoose = require('mongoose');
const cors = require('cors');
//Variable Configurations
//let dbURL = process.env.COSMOSDB_URL || 'mongodb://127.0.0.1:27017/sportscentrum';
//let dbURL = 'mongodb+srv://niku2889:niku2889@cluster0-tg6ei.mongodb.net/test?retryWrites=true';
let dbURL = 'mongodb://niku2889:niku2889@ds159661.mlab.com:59661/soildb';
const models = path.join(__dirname, 'models');

//Model Bootstrapping
fs.readdirSync(models).forEach(file => require(path.join(models, file)));

let app = express();

app.use(Logger.morgan);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

//CORS
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', ' X-Requested-With', ' Content-Type', ' Accept ', ' Authorization'],
    credentials: true
}));


//Routes Config
let index = require('./routes/index');

require('./routes/pages/user.js')(app);
require('./routes/pages/unites.js')(app);
require('./routes/pages/nutrients.js')(app);
require('./routes/pages/extraction.js')(app);
require('./routes/pages/recommandation.js')(app);
require('./routes/pages/sfApi.js')(app);
require('./routes/pages/convertion.js')(app);
app.use('/', index);


app.use(express.static(path.join(__dirname, 'upload')));


//Mongoose Configurations:
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    Logger.log.info("DATABASE - Connected");
});

mongoose.connection.on('error', (err) => {
    Logger.log.error('DATABASE - Error');
    Logger.log.error(err);
});

mongoose.connection.on('disconnected', () => {
    Logger.log.warn('DATABASE - disconnected  Retrying....');
});

let connectDb = function () {
    const dbOptions = {
        poolSize: 5,
        reconnectTries: Number.MAX_SAFE_INTEGER,
        reconnectInterval: 500
    };
    mongoose.connect(dbURL, dbOptions)
        .catch(err => {
            Logger.log.fatal('DATABASE - Error');
            Logger.log.fatal(err);
        });
};
connectDb();

module.exports = app;

const express =  require('express');
const bodyParser =  require('body-parser');
const routers =  require('./routes/index.js');
const MongoStore = require('connect-mongo');
const logger = require("morgan");
const moment = require('moment');
const { globalVariables } = require('./config/configuration');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
  })
)
 
/*  Flash and Session*/
app.use(session({
  secret: ')(*i8y9879G&hohuo*Y&%*^TRYF^%$##@@!#^%*&)&U(Yh09',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: Date.now() + 3600000 },
  store: MongoStore.create({
    mongoUrl: process.env.mongoURL,
    ttl: 300 * 24 * 60 * 60 
  })
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

/* Use Global Variables */
app.use(globalVariables);

// setting view engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.locals.moment = moment;
app.use(express.static(path.join(__dirname, '/public')))
 
routers(app);
  
app.use((req, res, next) => {
  let pageTitle = "Page Not Found";
  res.render('error404', { pageTitle: pageTitle });

  next();
}); 

module.exports = app; 
  


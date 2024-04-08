const express =  require('express');
const bodyParser =  require('body-parser');
const routers =  require('./routes/index.js');
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json())
app.use(express.urlencoded({
    extended: false,
  })
)

app.use(
    session({
      cookie: {
        maxAge: 180 * 60 * 1000,
      },
      secret: "dfskfgsdfbcdncdsfsgkflsfabdasduaegefdblakhslkjdfsjkdfbsdk",
      resave: false,
      saveUninitialized: false,
      store: new mongoStore({
        mongooseConnection: mongoose.connection,
        db: "mydb",
      })
    })
)

// initialize passport
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success")
  res.locals.error_messages = req.flash("error")
  res.locals.user = req.user ? true : false
  res.locals.session = req.session
  next()
})

// setting view engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, '/public')))
 
routers(app);
  
// app.use((error, req, res, next) => {
//     if(error){ 
//        // console.log(error)
//         let statusCode = error.statusCode || 422  
//         res.status(statusCode).json({ 
//             code : statusCode, 
//             success : false, 
//             message : error.message 
//         })
//     } 
//     next() 
// });
 
module.exports = app; 
  


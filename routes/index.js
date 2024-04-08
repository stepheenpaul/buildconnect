const isUser = require("../config/middlewares");
const authRouter =  require("./auth/auth.routes");
const authRouter =  require("./");


const routers = (app) => {

    // route to handle all get requests
    app.use("/", require("./routes/index"))

    app.use("/", require("./routes/registerRoutes"))
    app.use("/", require("./routes/invest"))
    app.use("/", require("./routes/contact"))
    
}
   
module.exports = routers;
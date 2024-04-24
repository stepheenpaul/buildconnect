const {isUserLoggedIn} = require("../config/middlewares");
const authRouter =  require("./auth/auth.routes");
const projectRouter = require("./project/project.routes")
const bidRouter = require("./bid/bid.routes")


const routers = (app) => {

    app.use("/", authRouter)
    app.use("/bid", isUserLoggedIn, bidRouter)
    app.use("/project", isUserLoggedIn, projectRouter);
    
}
   
module.exports = routers;
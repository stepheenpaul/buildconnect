// Dependencies
const http = require("http");
const express = require("express")
const app = require("./app");
const dotenv = require("dotenv");
const logger = require("morgan")
const path = require("path")
const ejs = require("ejs")
const session = require("express-session")
// const mongoStore = require("connect-mongo")(session)
const mongoose = require("mongoose")
const passport = require("passport")
require("./config/passport").passport
const flash = require("connect-flash")

dotenv.config();
const server = http.createServer(app); 

// Database connections
// mongoose.Promise = global.Promise
// const MONGO_URL = 'mongodb+srv://builderconnect:Q5Q85jBuhNidDXxE@cluster0.7oi91qh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// mongoose
//   .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
//   .then(() => console.log(`Database connected successfully`))
//   .catch((err) => console.log(`Database Connection failed ${err.message}`))

server.listen(process.env.PORT || 5000, () => console.log('Up and running 🚀'.concat(process.env.PORT || 2000)))
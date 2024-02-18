const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Development logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Static Files
app.use(express.static(`${__dirname}/public`))

// Middleware testing
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

//Routes

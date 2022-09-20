const express = require("express");
const morgan = require("morgan"); // for logging
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests, please try again in an hour!",
});

app.use("/v2", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({limit: "10kb"}));

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp(/* {
      whitelist: [
        "duration",
        "difficulty",
        "price",
      ],
    }*/)
);

// routes
app.use("/v2/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

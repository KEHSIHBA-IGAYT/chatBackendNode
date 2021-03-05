// imports
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser')
const createError = require("http-errors");

//middlewares
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
const indexRouter = require("./routes/index");
const chatRouter = require("./routes/chat");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log("Environment" + process.env);

    res.locals.message = err.message;
    res.locals.error = process.env === "development" ? err : {};

    let message;

    switch (err.name) {
        //Required Fields or Wrong field type missing
        case "ValidationError":
            message = { fields: [], code: 2000 };
            for (let key in err.errors) {
                message.fields.push(key);
                switch (err.errors[key].name) {
                    case "CastError":
                        message.code = 2001;
                        break;
                    case "ValidatorError":
                        message.code = 2002;
                        break;
                }
            }
            break;
    }

    if (err.code || err.name) {
        err.status = 400;
    }

    // render the error page
    return res.status(err.status || 500).json({
        success: false,
        message: message || err.message || "Internal error",
    });
});

module.exports = app;

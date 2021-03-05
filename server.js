//library imports
const http = require("http");
const socketio = require("socket.io");
const mongoose = require('mongoose');

//import configurations
const config = require("./config");

//express app
const app = require("./app");
app.set("port", config.port);


//create server and socket
const server = http.Server(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

//Listen for new messages
require("./controllers/chats/messageSocket.js")(io);

//Listen on provided port, on all network interfaces.
server.on("error", onError);
server.on("listening", onListening);

//Connect the mongoDB to store messages
mongoose.connect(config.mongo.connectionString, config.mongo.options,
    function (err, db) {
        if (err) {
            console.log("connection error", err);
        } else {
            console.log("Mongo: Connected");
            server.listen(config.port);
        }
    });

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
    // debug("Listening on " + bind);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
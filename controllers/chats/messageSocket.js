const Messages = require("../../models/Messages.js");
const recordMessage = require("./recordMessage.js");

module.exports = async io => {
    try {

        io.on("connection", socket => {

            socket.emit('connection', 'Connected to backend socket!!!');

            //Send status
            const sendStatus = (res) => {
                socket.emit('status', res)
            }

            socket.on(
                "new-message",
                async ({ userId, userName, message, createdAt }) => {

                    console.log("user", userName);
                    if (!userId || !userName || !message || !createdAt)
                        sendStatus("Message details not found!!!");

                    const result = await recordMessage(
                        userId,
                        userName,
                        message,
                        createdAt,
                        io
                    );

                    if (!result) {
                        sendStatus("Message could not be saved");
                    }
                    else {
                        io.emit("message-added", { userId, userName, message, createdAt });
                    }
                }
            );

            socket.on("disconnect", () => {
                console.log("User disconnected");
                socket.removeAllListeners();
            });
        });
    } catch (err) {
        console.log(err);
    }
};

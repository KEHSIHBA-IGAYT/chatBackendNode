// Adds a message to the chat
const Messages = require("../../models/Messages.js");

module.exports = async (userId, userName, message, createdAt, io) => {
    try {

        const messages = await Messages.create({ userId, userName, message, createdAt });
        let success;
        if (!messages) {
            success = false;
        }
        else {
            success = true;
        }

        return success;

    } catch (err) {
        console.log(err);
    }
};

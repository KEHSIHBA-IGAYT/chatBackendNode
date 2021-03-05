// Returns the stored chat
const Messages = require("../../models/Messages");

module.exports = async (req, res, next) => {
    try {
        const messages = await Messages.find({}, { '_id': 0, '__v': 0 });
        if (!messages) throw "Chat not found.";
        return res.json({
            success: true,
            messages: messages
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

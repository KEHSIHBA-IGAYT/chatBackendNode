// Store the logged in user
const User = require("../../models/User");

module.exports = async (req, res, next) => {
    try {

        console.log("Cleared");
        const loggedOut = await User.deleteMany({});
        var success;

        if (!loggedOut) {
            success = false;
        }
        else {
            success = true;
        }

        return res.json({
            success: success,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

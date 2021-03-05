// Returns the stored user
const User = require("../../models/User");

module.exports = async (req, res, next) => {
    try {
        console.log("get");
        const loggedInUser = await User.find({}, { '_id': 0, '__v': 0, 'updatedAt': 0 });
        var success;
        var user;
        if (!loggedInUser) {
            success = false;
            user = [];
        }
        else {
            success = true;
            user = loggedInUser;
        }

        return res.json({
            success: success,
            data: user
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

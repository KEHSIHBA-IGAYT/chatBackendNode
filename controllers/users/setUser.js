// Store the logged in user
const User = require("../../models/User");

module.exports = async (req, res, next) => {
    try {

        console.log("Set");
        console.log(req.body);
        const loggedInUser = await User.create({ loggedIn: req.body.userID, userName: req.body.userName });
        var success;
        var user;
        if (!loggedInUser) {
            success = false;
            user = {};
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

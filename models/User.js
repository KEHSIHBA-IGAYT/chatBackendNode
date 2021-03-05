const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    loggedIn: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);

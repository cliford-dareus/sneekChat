const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    friends: {
        type: ["string"],
    }
});

module.exports = mongoose.model('Friend', friendSchema);
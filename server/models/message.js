const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
    message: {
        type: [],
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    users: {
        type: []
    }
},
    {
        timestamps: true
    } 
);

module.exports = mongoose.model('Messages', MessageSchema);
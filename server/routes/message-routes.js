const { addMessage, getMessages, getAllMessage } = require("../controllers/messageController");
const express = require('express');
const router = express.Router();

router.post("/addmsg", addMessage);
router.get("/getmsg", getMessages);
router.get("/getAllmsg", getAllMessage);

module.exports = router;
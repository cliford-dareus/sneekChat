const { addMessage, getMessages, getAllMessage } = require("../controllers/messageController");
const express = require('express');
const router = express.Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/getAllmsg/", getAllMessage);

module.exports = router;
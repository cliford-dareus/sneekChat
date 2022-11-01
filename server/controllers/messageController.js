const Messages = require("../models/message");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMessage = async (req, res, next) => { 
    try {
        const { from } = req.body;
        const messages = await Messages.find({
          users: {
            $all: [from]
          }
        });

        // console.log(messages)
        
        res.status(201).json({ messages });
    } catch (error) {
        next(error);
    };
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const messages = await Messages.findOne({
      users: {
        $all: [from, to],
      }
    });
    
    // console.log(message)
    
    if(!messages){
        await Messages.create({
            message: [message],
            users: [from, to],
            sender: from,
        });

        console.log(message)
    };
    
    messages.message = [...messages.message, message];
    await messages.save();
    // if (data) return res.json({ msg: "Message added successfully." });
    // else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
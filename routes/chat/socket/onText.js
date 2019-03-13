var convModel = require("../../../models/conversation");
var msgModel = require("../../../models/message");

var onTextHandler = async function(data, chatSocket) {
  console.log("on text handler called");

  let text = data.text;
  let sender = data.sender;
  let reciever = data.reciever;
  let conversationId = data.chatId;
  let room = data.room;
  var savedMsg;

  let message = new msgModel({ text, sender, reciever, conversationId });
  await message.save(async (err, doc) => {
    if (!err) {
      try {
        let msgId = doc._id;
        console.log("msgId while saving", msgId);

        await convModel
          .findOneAndUpdate({ room: room }, { $push: { msgArray: msgId } })
          .exec()
          .then(e => {
            console.log("msg saved in conv", e);
          });

        savedMsg = doc;

        await console.log("ontext me msg save -------->>>>>>>>");
        await console.log("msgid while returning", savedMsg);
        chatSocket.to(data.room).emit("message", savedMsg);
      } catch (er) {
        console.log("error while pushing msg to conv", er);
        return "galat";
      }
    } else {
      console.log(err);
      return "galat";
    }
  });
};

module.exports = onTextHandler;

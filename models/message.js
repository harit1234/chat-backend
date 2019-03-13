var mongoose = require("mongoose");
var timestamp = require("mongoose-timestamp-plugin");
var conversationModel = require("../models/conversation");
var schema = mongoose.Schema;

var messageSchema = new schema({
  sender: { type: String, required: true },
  text: { type: String, default: "" },
  reciever: { type: String, required: true },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "conversation" }
});

messageSchema.plugin(timestamp);

var messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;

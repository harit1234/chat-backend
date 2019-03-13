var mongoose = require("mongoose");
var schema = mongoose.Schema;
var msgModel = require("./message");

var conversationSchema = new schema({
  users: [{ type: String }],
  msgArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],
  room: { type: String, required: true }
});

var conversationModel = mongoose.model("conversation", conversationSchema);

module.exports = conversationModel;

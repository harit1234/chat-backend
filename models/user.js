var mongoose = require("mongoose");
var conversationModel = require("../models/conversation");
var schema = mongoose.Schema;
var userSchema = new schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  conversationList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "conversation" }
  ]
});

module.exports = mongoose.model("user", userSchema);

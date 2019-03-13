var userModel = require("../../../models/user");

var getConvList = async function(req, res) {
  console.log("get conv list executed");

  var username = req.body.userName;

  var conversationList = await userModel
    .findOne({ userName: username })
    .populate("conversationList")
    .select("conversationList");
  console.log(conversationList);
  res.json(conversationList);
};

module.exports = getConvList;

var convModel = require("../../../models/conversation");

var getConDetails = async function(req, res) {
  let id = req.body.id;

  console.log("get Con Details executed");

  try {
    let conv = await convModel
      .findOne({ _id: id })
      .populate("msgArray")
      .exec();

    console.log("conv details for chatbox", conv);

    res.json({ conv });
  } catch (err) {
    console.log("error while getting conv details", err);
    res.status(500).json({ msg: "db error while getching conv for chatbox" });
  }
};

module.exports = getConDetails;

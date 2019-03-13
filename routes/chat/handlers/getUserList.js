var userModel = require("../../../models/user");

var getUserList = async (req, res) => {
  console.log("inside getUserList");
  let userName = req.body.userName;

  await userModel
    .find(
      { userName: { $not: { $eq: userName } } },
      { _id: "0", userName: "1" }
    )
    .exec((err, data) => {
      if (!err) {
        console.log(data);
        res.json({ userArray: data });
      } else res.status(404).json({ error: err });
    });
};

module.exports = getUserList;

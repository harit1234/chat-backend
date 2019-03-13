var jwt = require("jsonwebtoken");

var userModel = require("../../../models/user");

var loginHandle = async function(req, res) {
  console.log("login handler called");

  let userName = req.body.userName;
  let password = req.body.password;
  let userData = await userModel.findOne({ userName: userName });
  if (!userData || userData == [])
    res.status(404).json({ msg: "authentication failure" });
  else if (userData.password != password)
    res.status(403).json({ msg: "authentication failure" });
  else {
    var token = jwt.sign({ userName }, "SecretKey", {
      expiresIn: "2days"
    });
    res.json({ msg: "authentication successful", token: token });
    console.log("token sent from login handle");
  }
};

module.exports = loginHandle;

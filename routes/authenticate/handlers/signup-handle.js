var jwt = require("jsonwebtoken");

var userModel = require("../../../models/user");

var signupHandle = async function(req, res) {
  console.log("signup handler called");
  let userName = req.body.userName;
  let password = req.body.password;
  userData = new userModel({
    userName: userName,
    password: password,
    conversationList: []
  });

  await userData.save(err => {
    if (err) console.log(err);
    else {
      console.log("user saved", userData);
      var token = jwt.sign({ userName }, "SecretKey", {
        expiresIn: "2days"
      });
      res.json({ msg: "authentication successful", token: token });
      console.log("token sent from signup handle");
    }
  });
};

module.exports = signupHandle;

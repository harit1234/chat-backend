var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");

router.use("*", (req, res, next) => {
  if (!req.headers.token) res.json({ msg: "session failure" });
  else {
    var token = req.headers.token;
    var userName = req.body.userName;
    var decoded = jwt.decode(token, "SecretKey");
    console.log("decode token", decoded);
    if (decoded == { userName }) {
      console.log("decoded");
      next();
    }
  }
});

module.exports = router;

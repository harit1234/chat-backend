var express = require("express");
var router = express.Router();

var loginHandle = require("./handlers/login-handle");
var signupHandle = require("./handlers/signup-handle");

router.post("", async (req, res) => {
  console.log("auth index called");
  let useCase = req.body.useCase;

  switch (useCase) {
    case "login":
      loginHandle(req, res);
      break;
    case "signup":
      signupHandle(req, res);
      break;
  }
});

module.exports = router;

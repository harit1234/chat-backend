var express = require("express");
var router = express.Router();

var getconvList = require("./handlers/getConvList");
var getUserList = require("./handlers/getUserList");
var getSingleConvId = require("./handlers/getsingleconvid");
var getConDetails = require("./handlers/getConvDetails");

router.post("", (req, res) => {
  const useCase = req.body.useCase;
  switch (useCase) {
    case "getConvList":
      getconvList(req, res);
      break;
    case "getUserList":
      getUserList(req, res);
      break;
    case "getSingleConv":
      getSingleConvId(req, res);
      break;
    case "getConvDetails":
      getConDetails(req, res);
      break;
    default:
      res.json({ msg: "wrong usecase" });
      break;
  }
});

module.exports = router;

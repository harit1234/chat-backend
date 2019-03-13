var convModel = require("../../../models/conversation");
var userModel = require("../../../models/user");

var getSingleConv = async function(req, res) {
  console.log("inside get single conv handle");
  let sender = req.body.sender;
  let reciever = req.body.reciever;

  if (!sender || !reciever) {
    res.json({ msg: "incomplete info for fetching single conversation" });
    return;
  }

  try {
    var usersdb = await userModel
      .find({ userName: { $in: [sender, reciever] } })
      .exec();
    if (usersdb.length != 2) {
      res.status(401).json({ msg: "invalid sender-reciever info" });
      return;
    } else {
      console.log("<<<<<<<<<<<<<<<<<");
      console.log("<<<<<<<<<<<<<<<<<");
      console.log(usersdb);
      console.log("<<<<<<<<<<<<<<<<<");
      console.log("<<<<<<<<<<<<<<<<<");
    }
  } catch (err) {
    res
      .status(500)
      .json({ msg: "db error while checking user validity", error: err });
    return;
  }

  var convId;
  //--------------check whether conversation exists between the two, from conversation Model
  try {
    let room1 = `dd--${sender}--${reciever}`;
    let room2 = `dd--${reciever}--${sender}`;
    console.log("find exeec in get single conv");
    convId = await convModel
      .find(
        // {
        //   $and: [
        //     { users: { $elemMatch: { $in: [sender] } } },
        //     { users: { $elemMatch: { $in: [reciever] } } }
        //   ]
        // },
        { room: { $in: [room1, room2] } },
        { _id: "1", room: "1" }
      )
      .exec();

    console.log("id in find", convId);
    console.log("------------->>>>>>>>");

    //----------------if no conv, create one------------------------------------------------

    if (convId.length == 0) {
      console.log("new conv creation tried");
      let conv = new convModel({
        users: [sender, reciever],
        msgArray: [],
        room: `dd--${sender}--${reciever}`
      });

      //----------------------save conv in db-------------------------------------------------
      await conv.save(async (err, doc) => {
        if (!err) {
          convId = [];
          convId.push(doc);
          console.log("id of conv", convId);

          //--------------put references of conv in users db------------------------------

          try {
            await userModel
              .updateMany(
                { userName: { $in: [sender, reciever] } },
                { $push: { conversationList: convId[0]._id } }
              )
              .exec();
            console.log("conv id ref in user tried");
          } catch (err) {
            console.log("problem putting the conv ref in user model", err);
          }

          //------=---response in case of new conversation----------------------------------

          await res.json({
            msg: "successful",
            id: convId[0]._id,
            room: convId[0].room
          });
          return;
        } else {
          console.log("save con error", err);
          res.status(502).json({ msg: "db error while creating conversation" });
          return;
        }
      });
    }

    //---------------------------res in case of found conversation-----------------------------
    else {
      res.json({
        msg: "successful",
        id: convId[0]._id,
        room: convId[0].room
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ msg: "db error  while finding the conv", error: err });
    console.log(err);

    return;
  }
};

module.exports = getSingleConv;

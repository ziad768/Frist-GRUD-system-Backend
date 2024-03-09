
const { validationResult } = require("express-validator");
const fs = require("fs");
var Users;
GetData()
function GetData() {
    try {
      var getData = fs.readFileSync("./Data/Users.json").toString();
      Users = JSON.parse(getData);
    } catch {
      console.log("No Data Found");
      Users = [];
    }
  }
  
  function WriteData(Users) {
    fs.writeFileSync("./Data/Users.json", JSON.stringify(Users));
  }


function GetAllUsers(req, res) {
    res.json(Users);
  }

function GetSingleUser(req, res)  {
    const userId = +req.params.userId;
    const user = Users.find((user) => user.id === userId);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.json(user);
  }

function CreateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(errors.array());
        }
    
        var checkUsername = Users.some(
          (user) =>
            user.Username.toLowerCase().trim() ==
            req.body.Username.toLowerCase().trim()
        );
        if (checkUsername) {
          return res.status(400).json({ msg: "The username already exists." });
        }
        let NewUser = { id: Date.now(), ...req.body };
        Users.push(NewUser);
        WriteData(Users);
        res.status(201).json(NewUser);
      

}

function UpdateUser(req, res) {
    var userId = +req.params.userId;
    var checkUsername =  Users.some(user=> user.Username == req.body.Username  & user.id !== userId)
    if(checkUsername){
      return res.status(409).json({msg:'The username already exists.'})
    }
      Users.forEach((user) => {
        if (user.id == userId) {
          user.Username = req.body.Username || user.Username
          user.age = req.body.age|| user.age
        }
      });
      WriteData(Users);
      res.json(Users);
  }



function DeleteUser(req, res){
        const userId = +req.params.userId;
        Users =Users.filter(user =>  user.id != userId)
         WriteData(Users)
         res.send("Deleted")
      }




module.exports = {
    GetData,
    WriteData,
    GetAllUsers,
    GetSingleUser,
    CreateUser,
    UpdateUser,
    DeleteUser
}
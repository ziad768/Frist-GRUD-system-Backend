const express = require("express");
const App = express();
App.use(express.json());
const UserController = require("./controllers/Users.controller");
UserController.GetData();

const UsersRoute= require(`./routes/Users.route`);
App.use('/API/Users',  UsersRoute);

App.listen(5000, () => {
  console.log("Server is running");
});

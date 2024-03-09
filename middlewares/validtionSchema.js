const { body } = require("express-validator");

function CreateUserValid() {
  return [
    body("Username")
      .notEmpty()
      .withMessage("Invalid UserName")
      .isLength({ min: 3 })
      .withMessage("USername is Smaller than 3 letter")
      .isLength({ max: 16 })
      .withMessage("Username is biger than 16 letter"),
    body("age").notEmpty().withMessage("Invalid Age"),
  ];
}

module.exports = {
  CreateUserValid,
};

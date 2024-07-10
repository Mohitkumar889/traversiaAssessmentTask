const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: Number,
    default: 1, //1 for read-write , 2 for read only , 3 for write only
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    default: 1, // 1 for male, 2 female , 3 for other
  },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

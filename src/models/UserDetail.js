const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserDetailSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
});

var UserDetail = mongoose.model("UserDetail", UserDetailSchema);

module.exports = UserDetail;

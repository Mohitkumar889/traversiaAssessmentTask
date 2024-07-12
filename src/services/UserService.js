const User = require("../models/User");

module.exports = () => {
  const addUser = (data) => {
    console.log("UserService=>addUser");
    return new Promise(function (resolve, reject) {
      User.create(data).then(resolve).catch(reject);
    });
  };

  const updateUser = (id, data) => {
    console.log("UserService=>updateUser");
    return new Promise(async function (resolve, reject) {
      await User.findByIdAndUpdate({ _id: id }, data)
        .then(resolve)
        .catch(reject);
    });
  };

  const fetch = (id) => {
    return new Promise(function (resolve, reject) {
      let orm = User.findById(id).select("-__v");
      orm.then(resolve).catch(reject);
    });
  };

  const getuserList = (query, page, limit) => {
    console.log("FaqService => getFaqs");
    if (page) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let orm = User.aggregate([
        {
          $lookup: {
            from: "userDetails",
            localField: "_id",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
      ])
        .then(resolve)
        .catch(reject);
    });
  };

  const deleteUser = (id) => {
    return new Promise(function (resolve, reject) {
      let orm = User.deleteOne({ _id: id });
      orm.then(resolve).catch(reject);
    });
  };

  return {
    addUser,
    updateUser,
    fetch,
    getuserList,
    deleteUser,
  };
};

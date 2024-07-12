const UserService = require("../services/UserService");
const helpers = require("../util/helpers");

module.exports = () => {
  const addUser = async (req, res, next) => {
    console.log("UserController => addUser");
    if (req.body.authUserRole == 1) {
      let data = {
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
      };

      let User = await UserService().addUser(data);
      let token = await helpers().createJWT({
        User,
      });

      req.rData = { User, token };
      req.msg = "Success";
      next();
    } else if (req.body.authUserRole == 2) {
      req.msg = "You don't have permission to addUser";
      next();
    } else if (req.body.authUserRole == 3) {
      let data = {
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
      };

      let User = await UserService().addUser(data);
      let token = await helpers().createJWT({
        User,
      });

      req.rData = {};
      req.msg = "Success";
      next();
    }
  };

  const updateUser = async (req, res, next) => {
    console.log("UserController => updateUser");
    let { id } = req.body;
    if (req.body.authUserRole == 1) {
      await UserService().updateUser(id, req.body);
      let User = await UserService().fetch(id);

      req.rData = User;
      req.msg = "Success";

      next();
    } else if (req.body.authUserRole == 2) {
      req.msg = "You don't have permission to UpdateUser";
      next();
    } else if (req.body.authUserRole == 3) {
      await UserService().updateUser(id, req.body);
      req.msg = "Success";
      next();
    }
  };

  const getUser = async (req, res, next) => {
    console.log("UserController => getUser");
    let { page, limit } = req.query;

    page = page ? parseInt(page) : "";
    limit = limit ? parseInt(limit) : "";

    let query = {};
    if (req.body.authUserRole == 1) {
      let users = await UserService().getuserList(query, page, limit);

      req.msg = "success";

      req.rData = {
        page,
        limit,
        users,
      };

      next();
    } else if (req.body.authUserRole == 2) {
      let users = await UserService().getuserList(query, page, limit);

      req.msg = "success";

      req.rData = {
        page,
        limit,
        users,
      };

      next();
    } else if (req.body.authUserRole == 3) {
      req.msg = "You don't have permission to read";
      next();
    }
  };

  const deleteUser = async (req, res, next) => {
    console.log("UserController => deleteUser");
    let userId = req.params.id;
    if (req.body.authUserRole == 1) {
      await UserService().deleteUser(userId);
      req.msg = "deleted successfully";
      next();
    } else if (req.body.authUserRole == 2) {
      req.msg = "You don't have permission to delete";
      next();
    } else if (req.body.authUserRole == 3) {
      await UserService().deleteUser(userId);
      req.msg = "deleted successfully";
      next();
    }
  };
  return {
    addUser,
    updateUser,
    getUser,
    deleteUser,
  };
};

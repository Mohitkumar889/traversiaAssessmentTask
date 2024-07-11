const jwt = require("jsonwebtoken");
const ResponseMiddleware = require("./ResponseMiddleware");
require("dotenv").config();
const JWTSECRET = process.env.jwtSecret;
const UserService = require("../services/UserService");

module.exports = () => {
  const verifyUserRole = async (req, res, next) => {
    console.log("AuthMiddleware => verifyAdminToken");
    let usertoken = req.headers.authorization;

    try {
      if (usertoken) {
        let tokens = usertoken.split(" ");

        let token = tokens[1];
        console.log("Token", token);
        let payload = jwt.verify(token, JWTSECRET);
        console.log(payload, payload?.User?._id, "payload");
        let user = await UserService().fetch(payload?.User?._id);
        console.log(user, "user Exist");
        //checking user must exist in our DB else throwing error
        if (user) {
          console.log(`User with ID ${user._id} entered.`);
          req.body.userId = user._id;
          // req.body.firstName = user?.firstName;
          req.body.emailData = user?.email;
          req.loggedInUser = user;
          req.body.authUserRole = user?.role;

          next();
        } else {
          throw new Error("invalid_token");
        }
      } else {
        throw new Error("invalid_token");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;
      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  return {
    verifyUserRole,
  };
};

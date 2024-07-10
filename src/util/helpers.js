const messages = require("./messages");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWTSECRET = process.env.jwtSecret;

module.exports = function () {
  const resp = (response, lang, m = "success", data = {}, code = 1) => {
    return response.send({
      message: messages(lang)[m],
      data,
      code,
    });
  };

  const getErrorMessage = (errors) => {
    console.log("Helpers => getErrorMessage");

    try {
      console.log(errors);
      for (var key in errors) {
        let rule = errors[key]["rule"];

        let exists = messages()[rule];
        if (exists) return messages()[rule](key)["en"];

        return errors[key]["message"];
      }
    } catch (ex) {
      return "Something is wrong, Please try again later !!" + ex.message;
    }
  };

  const createJWT = async (payload) => {
    return jwt.sign(payload, JWTSECRET, {
      expiresIn: "30d", // expires in 30 days
    });
  };

  return {
    resp,
    getErrorMessage,
    createJWT,
  };
};

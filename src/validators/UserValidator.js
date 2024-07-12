const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const vaildateUserAddUpdate = async (req, res, next) => {
    var userId = req.body.id;
    let v = {};
    if (userId) {
      v = new Validator(req.body, {
        id: validations.general.required,
        firstName: validations.general.nullableString,
        email: "nullable|unique:User,email,_id" + "," + userId + "",
      });
    } else {
      v = new Validator(req.body, {
        role: "required|in:1,2,3",
        firstName: validations.general.requiredString,
        lastName: validations.general.nullableString,
        email: validations.user.email,
        gender: "required|in:1,2,3",
        address: "required",
      });
    }
    validate(v, res, next, req);
  };

  return {
    vaildateUserAddUpdate,
  };
};

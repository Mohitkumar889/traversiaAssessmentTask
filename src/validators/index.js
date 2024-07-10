const validator = require("node-input-validator");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware.js");
const helpers = require("../util/helpers.js");
const { models } = require("../models");

validator.extend("unique", async function ({ value, args }) {
  console.log("ValidatorsIndex => unique", args);
  console.log(args);

  let result = null;

  if (args.length > 2) {
    result = await models[args[0]].findOne({
      [args[1]]: value,
      [args[2]]: { $ne: args[3] },
    });
  } else {
    console.log(models[args[0]], [args[1]], value, "dsjkdsjk");
    result = await models[args[0]].findOne({
      [args[1]]: value,
    });
  }
  return !result ? true : false;
});

validator.extendMessages(
  {
    required: "The :attribute field must not be empty.",
    email: "E-mail must be a valid email address.",
    exists: "The :attribute is not found!",
  },
  "en"
);

module.exports = {
  //common function to send validation response
  validate: (v, res, next, req = null) => {
    console.log("ValidatorsIndex => validate");

    if (
      v.check().then(function (matched) {
        if (!matched) {
          req.rCode = 0;
          let message = helpers().getErrorMessage(v.errors);

          ResponseMiddleware(req, res, next, message);
        } else {
          next();
        }
      })
    );
  },

  validations: {
    general: {
      required: "required",
      nullable: "nullable",
      requiredInt: "required|integer",
      requiredString: "required|string|maxLength:255",
      nullableString: "nullable|string|maxLength:255",
    },

    user: {
      email: "required|string|unique:User,email|maxLength:50",
    },
  },
};

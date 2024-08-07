const current_time = new Date().toString().slice(16, 24);

const ResponseMiddleware = require("./ResponseMiddleware");

module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      console.log(handler);
      let name = handler.name;

      console.log(`## ${current_time} ## Exception in ${name}:  ${ex.message}`);

      req.rCode = 0;
      let message = `Something went wrong -> ${ex.message}`;

      ResponseMiddleware(req, res, next, message);
    }
  };
};

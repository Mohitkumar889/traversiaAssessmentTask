const UserController = require("../controllers/UserController");
const CheckRoleMiddleware = require("../middlewares/CheckRoleMiddleware");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const UserValidator = require("../validators/UserValidator");

const router = require("express").Router();

router.post(
  "/addUser",
  CheckRoleMiddleware().verifyUserRole,
  UserValidator().vaildateUserAddUpdate,
  ErrorHandlerMiddleware(UserController().addUser),
  ResponseMiddleware
);

router.put(
  "/updateUser",
  CheckRoleMiddleware().verifyUserRole,
  UserValidator().vaildateUserAddUpdate,
  ErrorHandlerMiddleware(UserController().updateUser),
  ResponseMiddleware
);

router.get(
  "/getUsers",
  CheckRoleMiddleware().verifyUserRole,
  ErrorHandlerMiddleware(UserController().getUser),
  ResponseMiddleware
);

router.delete(
  "/deleteUser/:id",
  CheckRoleMiddleware().verifyUserRole,
  ErrorHandlerMiddleware(UserController().deleteUser),
  ResponseMiddleware
);

module.exports = router;

const express = require("express");
const router = express.Router();


const  {verifyToken, isAdmin } = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

//router.get("/me", verifyToken, userController.getMe);
//router.get("/", verifyToken, userController.getUsers);
/*router.get("/:id", verifyToken, userController.getUserById);
router.post("/", verifyToken, isAdmin, userController.createUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);*/

router.post("/sql-user", userController.createUserSQLTest);
router.get("/sql-users", userController.getUsersSQLTest);
router.put("/sql-user/:id", userController.updateUserSQLTest);
router.delete("/sql-user/:id", userController.deleteUserSQLTest);

module.exports = router;
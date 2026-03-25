const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");

//Get /users
const getUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

//GET /User by Id
const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
};

//GET /me
const getMe = async (req, res) => {
  res.json(req.user);  
};

//POST /users
const createUser = async (req, res) => {
    const { name } = req.body;

    const newUser = await userService.createUser(name);
    res.json(newUser);
};

//PUT /Update user by Id
const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
}

//DELETE /User by Id
const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.json({ message: "Deleted" });
};


module.exports = {getUsers, createUser, getMe, updateUser, deleteUser, getUserById};
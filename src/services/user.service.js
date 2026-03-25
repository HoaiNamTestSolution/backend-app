const User = require("../models/user.model");

const getAllUsers = async () => {
    return await User.find().select("-password");
};

const createUser = async (name) => {
    return await User.create({ username: name });
};

const getUserById = async (id) => {
    return await User.findById(id).select("-password")
};

const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, {returnDocument: "after",
                                                     runValidators: true});
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
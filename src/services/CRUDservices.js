const connection = require("../config/database");
const User = require("../models/user");


const getAllUser = async () => {
    const result = await User.find({});  
    return result;
}

const getUserByID = async (id) => {
    const result = await User.findById(id);
    return result
}

const updateUserByID = async (id, name, email, city) => {
    const result = await User.updateOne({id, name, city, email})
    return result
}

const deleteUserByID = async (id) => {
    const result = User.deleteOne({_id: id});
    return result;
}


module.exports = {
    getAllUser,
    getUserByID,
    updateUserByID,
    deleteUserByID
}
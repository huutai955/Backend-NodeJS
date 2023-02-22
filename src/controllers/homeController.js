const connection = require("../config/database");
const User = require("../models/user");
const {getAllUser, getUserByID, updateUserByID, deleteUserByID} = require("../services/CRUDservices")

const getHomePage = async (req, res) => {
        const result = await getAllUser();
        return res.render('homepage.ejs', {data: result})
}

const getEditUserPage = async (req, res) => {
    const {id} = req.params;
    const result = await getUserByID(id);
    return res.render('editpage.ejs', {data: result})
}



const createNewUser = async (req, res) => {
    const { email, name, city } = req.body
    await User.create({
        email,
        name,
        city
    })
    res.send("Create new user successfully!")

}

const updateUser = async (req, res) => {
    const { email, name, city, id } = req.body;
    const result = await updateUserByID(id, name, email, city);
    console.log(result)
    return res.send("Update User Successfully")
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const result = await deleteUserByID(id)
    console.log(result)
    return res.send("Delete User Successfully")
}


module.exports = {
    getHomePage,
    createNewUser,
    getEditUserPage,
    updateUser,
    deleteUser
}
const express = require("express");
const { getHomePage, createNewUser, getEditUserPage, updateUser, deleteUser } = require("../controllers/homeController");

const router = express.Router();



router.get('/', getHomePage)
router.get('/edit/:id', getEditUserPage)



router.post('/delete-user/:id', deleteUser)
router.post('/update-user', updateUser)
router.post("/create-user", createNewUser)



module.exports = router;
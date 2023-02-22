const express = require("express");
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFile, postUploadMultipleFiles } = require("../controllers/apiController");
const { createCustomer, postCreateArrayCustomers, getAllCustomers, updateCustomer, deleteCustomer, deleteManyCustomers, getAllCustomersWithPagination } = require("../controllers/customerController");
const { createEmptyProject, getEmptyProject, deleteProject, updateProject } = require("../controllers/projectController");
const { createEmptyTask, getAllTask, deleteTask, updateTask } = require("../controllers/taskController");

const routerAPI = express.Router();




routerAPI.get('/users', getUsersAPI)
routerAPI.post('/users', postCreateUserAPI)
routerAPI.put('/users', putUpdateUserAPI)
routerAPI.delete('/users', deleteUserAPI)
routerAPI.post('/file', postUploadSingleFile)
routerAPI.post('/files', postUploadMultipleFiles)


routerAPI.post('/customers', createCustomer)
routerAPI.post('/customers-many', postCreateArrayCustomers)
routerAPI.get('/customers', getAllCustomers)
routerAPI.get('/customers-pagination', getAllCustomersWithPagination)
routerAPI.put('/customers', updateCustomer)
routerAPI.delete('/customers', deleteCustomer)
routerAPI.delete('/customers-many', deleteManyCustomers)


// Project
routerAPI.post('/projects', createEmptyProject)
routerAPI.get('/projects', getEmptyProject)
routerAPI.delete('/projects', deleteProject)
routerAPI.put('/projects', updateProject)


// Task
routerAPI.post('/tasks', createEmptyTask)
routerAPI.get('/tasks', getAllTask)
routerAPI.delete('/tasks', deleteTask)
routerAPI.put('/tasks', updateTask)


routerAPI.get('/infor', (req, res) => {
    console.log("Check query: ", req.query)
    return res.status(200).json({
        Data: req.query
    })
})

routerAPI.get('/infor/:name/:address', (req, res) => {
    console.log("Check query: ", req.params)
    return res.status(200).json({
        Data: req.params
    })
})





module.exports = routerAPI;
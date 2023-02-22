const { createEmptyTaskService, getAllTaskService, deleteTaskService, updateTaskService } = require("../services/taskService")


const createEmptyTask = async (req, res) => {
    let result = await createEmptyTaskService(req.body)
    res.status(200).json({
        EC: 0,
        Data: result
    })
}


const getAllTask =  async (req, res) => {
    let result = await getAllTaskService(req.query);
    res.status(200).json({
        EC: 0,
        Data: result
    })
}

const deleteTask =  async (req, res) => {
    let result = await deleteTaskService(req.body.id);
    res.status(200).json({
        EC: 0,
        Data: result
    })
}


const updateTask =  async (req, res) => {
    let result = await updateTaskService(req.body);
    res.status(200).json({
        EC: 0,
        Data: result
    })
}


module.exports = {
    createEmptyTask,
    getAllTask,
    deleteTask,
    updateTask
}
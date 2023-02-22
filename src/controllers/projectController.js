const { createEmptyProjectService, getProjectService, deleteProjectService, updateProjectService } = require("../services/projectService")


const createEmptyProject =  async (req, res) => {
    let result =  await createEmptyProjectService(req.body);
    
    res.status(200).json({
        EC: 0,
        Data: result
    })
}

const getEmptyProject =  async (req, res) => {
    let result = await getProjectService(req);
   res.status(200).json({
    EC:0,
    Data: result
   })
}

const deleteProject =  async (req, res) => {
    let result = await deleteProjectService(req.body.id);
    res.status(200).json({
        EC: 0,
        Data: result
    })
}

const updateProject =  async (req, res) => {
let result = await updateProjectService(req.body);
res.status(200).json({
    EC: 0,
    Data: result
})
}

module.exports = {
    createEmptyProject,
    getEmptyProject,
    deleteProject,
    updateProject
}
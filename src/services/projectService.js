const Project = require("../models/project")
const aqp = require('api-query-params');


const createEmptyProjectService = async (data) => {
  if (data.type === "EMPTY-PROJECT") {
    try {
        let result = await Project.create(data)
        return result
       }catch(err) {
        console.log(err);
       }
  }
  if (data.type === "ADD-USERS") {
    let myProject  = await Project.findOne({_id: data.projectId}).exec()
    for (let i = 0;i< data.id.length;i++){
        myProject.usersInfor.push(data.id[i]);
    }
    let result = myProject.save();
    return  result
  }

  if (data.type === "ADD-TASKS") {
    let myProject  = await Project.findOne({_id: data.projectId}).exec()
    for (let i = 0;i< data.taskArr.length;i++){
        myProject.tasks.push(data.taskArr[i]);
    }
    let result = myProject.save();
    return  result
  }

  if (data.type === "REMOVE-USER") {
    let myProject  = await Project.findOne({_id: data.projectId}).exec()
    for (let i = 0;i< data.userList.length;i++){
        myProject.usersInfor.pull(data.userList[i]);
    }
    let result = myProject.save();
    return  result
  }

  return null
}

const getProjectService =  async (req) => {
  const {filter, limit, population} = aqp(req.query)
  let offset = (filter.page -1) * limit;
  let result = await Project.find({}).skip(offset).limit(limit).populate(population).exec(); 
  return result
}

const deleteProjectService = async (id) => {
    let result = await Project.deleteOne({_id: id})
    return result
}


const updateProjectService = async (data) => {
  const {id, name, endDate, description} = data
  let result = await Project.updateOne({_id: id}, {name, endDate, description})
  return result
}


module.exports = {
    createEmptyProjectService,
    getProjectService,
    deleteProjectService,
    updateProjectService
}
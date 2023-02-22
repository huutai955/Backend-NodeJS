const Task = require("../models/task")
const aqp = require('api-query-params');


const createEmptyTaskService = async (data) => {
    if (data.type === "EMPTY-TASK") {
        let result = await Task.create(data);
        return result
    }

    

    return null
}


const getAllTaskService = async (queryString) => {
    const { filter, limit } = aqp(queryString)
    let offset = (filter.page - 1) * 10;
    let result = await Task.find(filter).skip(offset).limit(limit).exec();
    return result
}



const deleteTaskService = async (id) => {
    let result = await Task.deleteOne({_id: id});
    return result
}

const updateTaskService = async (data) => {
    // const {id, endDate, name, description, status} = data
    const {id} = data
    // console.log(id)
    let result = await Task.updateOne({_id: id}, {...data});
    return result
}



module.exports = {
    createEmptyTaskService,
    getAllTaskService,
    deleteTaskService,
    updateTaskService
}
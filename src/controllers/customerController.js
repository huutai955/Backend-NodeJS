const { createCustomerService, createCustomerManyService, getAllCustomersService, updateCustomerService, deleteCustomerService, deleteManyCustomersService, getAllCustomersPaginationService } = require("../services/customerService");
const { uploadMultipleFiles, uploadSingle } = require("../services/fileService")
const aqp = require('api-query-params');


const createCustomer =  async (req, res) => {
    const {name, address, email, description, phone} = req.body;
    let urlPath = '';
    
    if (!req.files || Object.keys(req.files).length === 0) {
        
    }else {
        if (Array.isArray(req.files.image)) {
            let result = await uploadMultipleFiles(req.files.image)
            urlPath = result.path
        }else {
            let result = await uploadSingle(req.files.image);
            urlPath = result.path
        }
    }
   
    const data = {
        name,
        address,
        email,
        description,
        image: urlPath,
        phone
    }

    let result = await createCustomerService(data)
    res.status(200).json({
        EC: 0,
        Data: result
    })

}
const postCreateArrayCustomers = async (req, res) => {
    const {customers} = req.body;
    const result = await createCustomerManyService(customers)
    console.log(result)
    res.status(200).json({
        EC: 0,
        Data: result
    })
}

const getAllCustomers = async (req, res) => {
    const result = await getAllCustomersService(req)
    res.status(200).json({
        EC: 0,
        Data: result
    })
}

const getAllCustomersWithPagination = async (req, res) => {
    const {limit, page} = req.query;
    // console.log(req.query)
    const result = await getAllCustomersPaginationService(limit, page)
    res.status(200).json({
        EC: 0,
        Data: result
    })
}

const updateCustomer = async (req, res) => {
    const result = await updateCustomerService(req);
    console.log(result)
    res.status(200).json({
        EC: 0,
        Data: result
    })
}


const deleteCustomer = async (req, res) => {
    let {_id} = req.body; 
    console.log(_id)
    let result = await deleteCustomerService(_id)
    res.status(200).json({
        EC: 0,
        Data: result
    })
}



const deleteManyCustomers = async (req, res) => {
    let id = req.body.customers
    let result = await deleteManyCustomersService(id);
    res.status(200).json({
        EC: 0,
        Data: result
    })
}




module.exports = {
    createCustomer,
    postCreateArrayCustomers,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    deleteManyCustomers,
    getAllCustomersWithPagination
}
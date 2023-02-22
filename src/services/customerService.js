const Customer = require("../models/customer");
const { uploadSingle } = require("./fileService");
const aqp = require('api-query-params');
const Joi = require('joi');


const createCustomerService = async (data) => {
    const {name, address, email, description, image, phone} = data
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        phone: Joi.string()
            .pattern(new RegExp('^[0-9]{8,11}$')),
    
        repeat_password: Joi.ref('password'),
    
        email: Joi.string().email(),
    
        description: Joi.string()
    })

    schema.validate(data, {abortEarly: true});
    try {
        let newCustom = await Customer.create({
            name, 
            address,
            email,
            description,
            image,
            phone
        })

        console.log(newCustom);
        return newCustom
    } catch (err) {
        console.log(err)
    }
}

const createCustomerManyService = async (data) => {
    try {
        let result = await Customer.insertMany(data)

        return result
    }catch(err) {
        console.log(err);
    }
}

const getAllCustomersService = async (req) => {
    try {
        // const query = aqp(
        //     'status=sent&timestamp>2016-01-01&author.firstName=/john/i&limit=100&skip=50&sort=-timestamp&populate=logs&fields=id,logs.ip'
        //   );
        const {filter} = aqp(req.query)
        console.log(filter)
        let result = await Customer.find(filter)
        return result
    }catch(err) {
        console.log(err);
    }
}


const getAllCustomersPaginationService = async (limit, page) => {
    try {
        let offset = (page -1) * page
        let result = await Customer.find({}).skip(offset).limit(limit).exec();
        return result
    }catch(err) {
        console.log(err);
    }
}



const updateCustomerService = async (req) => {
    const {name, id, address, email, description, phone} = req.body;
    let urlImage = '';

    if (!req.files || Object.keys(req.files).length === 0) {
        
    }else {
        let result = await uploadSingle(req.files.image)
        urlImage = result.path;
    }
    try {
        let result = await Customer.updateOne({id,name, address, email, description, phone, image: urlImage })
        return result
    }catch(err) {
        console.log(err);
    }
}

const deleteCustomerService = async (id) => {
    try {
        let result = await Customer.deleteById(id)
        console.log(result)
        console.log(id)
        return result
    }catch(err) {
        console.log(err)
    }
}

const deleteManyCustomersService = async (id) => {
    try {
        let result = await Customer.delete({_id: {$in: id}})
        return result
    }catch(err) {
        console.log(err)
    }
}




module.exports = {
    createCustomerService,
    createCustomerManyService,
    getAllCustomersService,
    updateCustomerService,
    deleteCustomerService,
    deleteManyCustomersService,
    getAllCustomersPaginationService
}
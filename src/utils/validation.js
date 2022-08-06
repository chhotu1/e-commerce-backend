const  Joi = require('joi');
const validateRequest = require('./validate_required');
const Regex = require('./../config/Regex');
function registerValidation(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(Regex.PASSWORD_REGEX)).required(),
        phone: Joi.number().integer().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number"),
        name:Joi.string().required(),        
    });
    validateRequest.validateRequired(req,res, next, schema);
}

function profileUpdateValidation(req, res, next) {
    const schema = Joi.object({
        phone: Joi.number().integer().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number"),
        name:Joi.string().required(),
        address: Joi.string(),
        email: Joi.string().email().required(),
    });
    validateRequest.validateRequired(req,res, next, schema);
}

function changePassword(req, res, next) {
    const schema = Joi.object({
        currentPassword: Joi.string().pattern(new RegExp(Regex.PASSWORD_REGEX)).required(),
        newPassword: Joi.string().pattern(new RegExp(Regex.PASSWORD_REGEX)).required(),
        verifyPassword: Joi.string().pattern(new RegExp(Regex.PASSWORD_REGEX)).required(),
    });
    validateRequest.validateRequired(req,res, next, schema);
}

function loginValidation(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(Regex.PASSWORD_REGEX)).required(),
    });
    validateRequest.validateRequired(req,res, next, schema);
}

function categoryValidation(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        // image_url: Joi.string(),
        // image_name: Joi.string(),
    });
    validateRequest.validateRequired(req,res, next, schema);
}

function leaveValidation(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        // image_url: Joi.string(),
        // image_name: Joi.string(),
    });
    validateRequest.validateRequired(req,res, next, schema);
}
function notificationValidation(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        // image_url: Joi.string(),
        // image_name: Joi.string(),
    });
    validateRequest.validateRequired(req,res, next, schema);
}



async function productValidation(req, res, next) {
    const schema = await Joi.object({
        title: Joi.string().required(),
        category_id: Joi.string().required(),
        price: Joi.string().required(),
        // address: Joi.string(),
        // phone: Joi.number().integer().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number"),
        // photo: Joi.string(),
        // offer:Joi.number().integer().min(0).max(1),
        // offer_price:Joi.number().integer().min(0).max(400),
        // slug:Joi.string(),
        // discription:Joi.string(),
        // image_url: Joi.string(),
        // image_name:Joi.string(),
        
    });
    await validateRequest.validateRequired(req,res, next, schema);
}

module.exports = {
    registerValidation,loginValidation,categoryValidation,
    profileUpdateValidation,
    productValidation,
    changePassword,
    leaveValidation,
    notificationValidation
}


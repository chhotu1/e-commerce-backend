module.exports.validateRequired = (req,res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        //stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        res.json({
            messages:`Validation error: ${error.details.map(x => x.message).join(', ')}`,
            status:false
        })
    } else {
        req.body = value;
        next();
    }
}
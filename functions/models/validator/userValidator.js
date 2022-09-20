const AppError = require('../../utils/appError');
const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'))
    .extend(require("joi-phone-number"));


exports.getUserById = async function (req, res, next) {
    const schema = Joi.object({
        id: Joi.string().min(3).max(50).required()
    });

    const {error} = await schema.validate(req.params);
    if (error) {
        next(new AppError(error.details[0].message, 400))
    }
    next();
};

exports.createUser = async function (req, res, next) {
    let data = req.body;
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
            role: Joi.string().valid('user', 'admin', 'worker', 'market-owner').required(), // TODO user roles will be fetched from var
        email: Joi.string().email({
            minDomainSegments: 2
        }).required(),
    });
    const {error} = await schema.validate(data);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
    }
    next();
};

exports.updateUser = async function (req, res, next) {
    let data = req.body;
    const schema = Joi.object({
        id: Joi.string().min(3).max(50),
        name: Joi.string().min(3).max(50),
        email: Joi.string().email({
            minDomainSegments: 2, 
            tlds: { allow: ['com', 'net'] } 
        }),
    });
    const {error} = await schema.validate(data);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
    }
    next();
};

exports.deleteUserById = async function (req, res, next) {
    let data = req.params;
    const schema = Joi.object({
        id: Joi.string().min(3).max(50).required()
    });
    const {error} = await schema.validate(data);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
    }
    next();
};
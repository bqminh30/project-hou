const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const customerService = require('../service/customer.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    customerService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    customerService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    customerService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    customerService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    customerService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        birthday: Joi.string().date().iso().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()

       
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        code: Joi.string().empty(),
        name: Joi.string().empty(),
        address: Joi.string().empty(),
        birthday: Joi.string().date().iso().empty(),
        phone: Joi.string().empty(),
        email: Joi.string().email().empty(),
        password: Joi.string().min(6).empty(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty()
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
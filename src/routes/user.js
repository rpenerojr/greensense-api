'use strict';

const express = require('express');
const UserController = require('./../controllers/user');
const { authenticate } = require('./../middlewares/authenticate');
const validate = require('./../validators/validate');
const ErrorMapper = require('../mappers/errors');

const loginSchema = require('./../validators/users/login-credentials.json');

class UserRoute {
    constructor (config) {
        this.config = config;

        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes () {
        this.router.get('/v1/users', authenticate, this.list);
        this.router.get('/v1/user/:id', authenticate, this.find);
        this.router.post('/v1/login', authenticate, this.login);
        this.router.post('/v1/user', authenticate, this.create);
    }

    list (req, res) {
        res.send('get all users');
    }

    find (req, res) {
        res.send('find a user');
    }

    login (req, res) {
        const credentials = {
            username: req.body.username,
            password: req.body.password
        };

        const isPayloadValid = validate(credentials, loginSchema);

        if (typeof(isPayloadValid) === 'object') {
            res.status(400);
            return res.send(ErrorMapper.requestPayloadErrorMapper(isPayloadValid));
        }

        new UserController.LoginController(credentials, this.config);
    }

    create (req, res) {
        res.send('create user');
    }
}

module.exports = UserRoute;

'use strict';

const express = require('express');
const UserController = require('./../controllers/users');
const { authenticate } = require('./../middlewares/authenticate');
const validate = require('./../validators/validate');
const UserMapper = require('../mappers/user-mapper');
const AuthMapper = require('../mappers/auth-mapper');
const AjvValidationErrorMapper = require('../mappers/errors/unauthorized-error-mapper');
const UnauthorizedErrorMapper = require('../mappers/errors/unauthorized-error-mapper');

const loginSchema = require('./../validators/users/login-credentials.json');

class UserRoute {
    constructor (config) {
        this.config = config;

        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes () {
        this.router.get('/v1/users', authenticate, this.list);
        this.router.get('/v1/users/:id', authenticate, this.get);
        this.router.post('/v1/users/login', authenticate, this.login);
        this.router.post('/v1/users', authenticate, this.create);
    }

    list (_req, res) {
        new UserController.ListController().process(function (_error, result) {
            res.send((new UserMapper(result)).map());
        });
    }

    get (req, res) {
        new UserController.GetController({
            id: parseInt(req.params.id)
        }).process(function (_error, result) {
            res.send((new UserMapper(result)).map());
        });
    }

    login (req, res) {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
            privilege: req.body.privilege
        };

        const validation = validate(credentials, loginSchema);

        if (!validation.isValid) {
            res.status(400);
            return res.send((new AjvValidationErrorMapper(validation)).map());
        }

        new UserController.LoginController(credentials)
            .process(function(error, result) {
                if (error) {
                    res.status(401);
                    return res.send((new UnauthorizedErrorMapper()).map());
                }

                res.send((new AuthMapper(result)).map())
            });
    }

    create (req, res) {
        res.send('create user');
    }
}

module.exports = UserRoute;

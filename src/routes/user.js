'use strict';

const express = require('express');
const UserController = require('./../controllers/users');
const { authenticate } = require('./../middlewares/authenticate');
const validate = require('./../validators/validate');

const UserMapper = require('../mappers/user-mapper');
const AuthMapper = require('../mappers/auth-mapper');

const AjvValidationError = require('../errors/ajv-validation-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const loginSchema = require('../validators/schema/users/login-credentials');
const createSchema = require('../validators/schema/users/create');

class UserRoute {
    constructor (config) {
        this.config = config;

        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes () {
        this.router.get('/v1/users', authenticate, this.list);
        this.router.get('/v1/users/:id', authenticate, this.get);
        this.router.post('/v1/users/login', this.login);
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
            return res.send(new AjvValidationError(validation).map());
        }

        new UserController.LoginController(credentials)
            .process(function(error, result) {
                if (error) {
                    res.status(401);
                    return res.send(new UnauthorizedError().map());
                }

                res.send((new AuthMapper(result)).map())
            });
    }

    create (req, res) {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            privilege: req.body.privilege
        }

        const validation = validate(user, createSchema);

        if (!validation.isValid) {
            res.status(400);

            return res.send(new AjvValidationError(validation).map());
        }

        res.send('create user');
    }
}

module.exports = UserRoute;

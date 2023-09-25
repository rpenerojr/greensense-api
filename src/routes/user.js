'use strict';

const express = require('express');
const UserController = require('./../controllers/user');
const { authenticate } = require('./../middlewares/authenticate');

class UserRoute {
    constructor (config) {
        this.config = config;

        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes () {
        this.router.get('/v1/users', authenticate, this.list);
        this.router.get('/v1/users/:id', authenticate, this.find);

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
        // @todo: Add request body validation
        const credentials = {
            username: req.body.username,
            password: req.body.password
        };

        new UserController.LoginController(credentials, this.config)
            .process(function(error, result) {
                if (error) {
                    res.status(404);
                    // @todo: Add error mapper
                    res.send({
                        error: {
                            detail: 'User not found or unregistered'
                        }
                    });
                }

                // @todo: Add response mapper
                res.send(result);
            });
    }

    create (req, res) {
        res.send('create user');
    }
}

module.exports = UserRoute;

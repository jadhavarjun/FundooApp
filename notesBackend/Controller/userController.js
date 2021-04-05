const sampleService = require('../Service/userService');
const statusCode = require('../Middleware/httpStatusCode.json')
require('dotenv').config()

const objService = new sampleService();
const response = {};
module.exports = class Controller {
    create(req, res) {
        console.log("cccccccccccccccccccccccccccccccccccc");
        try {
            objService.insert(req.body)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.log(error);
        }
    }
    getData(req, res) {
        try {
            objService.findAll()
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.log(error);

        }
    }

    login(req, res) {
        try {
            console.log("check test <<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>");
            objService.login(req.body)
                .then((result) => {
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
                    response.sucess = result.flag;
                    response.message = result.message;
                    response.data = result.data;
                    // response.jwtToken = result.jwtToken;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.error(error);
        }
    }

    forgetPassword(req, res) {
        try {
            objService.forgetPassword(req.body)
                .then((result) => {
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.error(error);
        }
    }
    resetPassword(req, res) {
        try {
            let password = req.body.password;
            let email = req.decoded.email;
            objService.resetPassword(email, password)
                .then((result) => {
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.error(error);
        }
    }
    delete(req, res) {
        try {
            let id = req.params.id;
            objService.delete(id)
                .then((result) => {
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.error(error);
        }
    }
}


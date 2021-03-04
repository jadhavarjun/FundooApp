const sampleService = require('../Service/userService');
const statusCode = require('../Middleware/httpStatusCode.json')

const objService = new sampleService();
const response = {};
module.exports = class Controller {
    create(req, res) {
        try {
            objService.insert(req.body)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(statusCode.OK).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(statusCode.BadRequest).send(response);
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
                    res.status(statusCode.OK).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(statusCode.BadRequest).send(response);
                });
        } catch (error) {
            console.log(error);

        }
    }

    login(req, res) {
        try {
            objService.login(req.body)
            .then((result) => {
                response.flag = true;
                response.message = result.message;
                response.data = result.data;
                // response.jwtToken = result.jwtToken;
                res.status(statusCode.OK).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(statusCode.BadRequest).send(response);
            });
        } catch (error) {
            console.error(error);
        }
    }

    forgetPassword(req, res){
        try {
            console.log("Controlle...............")
            objService.forgetPassword(req.body)
            .then((result) => {
                response.flag = true;
                response.message = result.message;
                res.status(statusCode.OK).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(statusCode.BadRequest).send(response);
            });
        } catch (error) {
            console.error(error);
        }
    }

}
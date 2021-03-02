const sampleService = require('../Service/userService');

const objService = new sampleService();
const response = {};
module.exports = class Controller {
    create(req, res) {
        try {
            objService.insert(req.body)
                .then((result) => {
                    //console.log(req.body);
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
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
                    response.success = true;
                    response.message = result.message;
                    res.status(200).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.data = err.message;
                    res.status(400).send(response);
                });
        } catch (error) {
            console.log(error);

        }
    }

    login(req, res) {
        try {
            objService.login(req.body)
            .then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        } catch (error) {
            console.error(error);
        }
    }

}
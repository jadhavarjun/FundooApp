const sampleService = require('../Service/userService');

const objService = new sampleService();
const response = {};
module.exports = class Controller {
    create(req, res) {
        try {
            objService.insert(req.body)
                .then((result) => {
                    console.log(req.body);
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
    

}
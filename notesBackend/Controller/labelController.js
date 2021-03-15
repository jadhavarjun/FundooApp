const statusCode = require('../Middleware/httpStatusCode.json')
const labelService = require('../Service/labelService')


const response = {};
class LabelController {
    createLabel(req, res) {
        try {
            let id = req.decoded.id;
            labelService.createLabel(req.body, id)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(result.status).send(response);
                });
        } catch (error) {
            console.log(error);
        }
    }

    getUserAllLabelNote(req, res){
        try {
            let id = req.decoded.id;
            labelService.getUserAllLabelNote(id)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(result.status).send(response);
                });
        } catch (error) {
            console.error("Employee Record is Not found Please Enter Correct One");
        }
    }

    updateLabel(req, res) {
        try {
            let newData = req.body;
            let id = req.params.id;
            console.log("update id and data", id, newData);
            labelService.updateLabel(id, newData)
                .then((result) => {
                    response.flag = true;
                    response.data = result.data;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });

        } catch (error) {
            console.error("Record is Not found Please Enter Correct One");
        }
    }

    deleteLabel(req,res){
        labelService.deleteLabel
        try {
            labelService.deleteLabel(req.params.id)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(result.status).send(response);
                });
        } catch (error) {
            console.error("Label Record is Not found Please Enter Correct One");
        }
    }
}

module.exports = new LabelController()
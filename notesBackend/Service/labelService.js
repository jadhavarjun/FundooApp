const labelModel = require('../Model/labelModel')
const statusCode = require('../Middleware/httpStatusCode.json')
const logger = require('../Middleware/winstenLogger')


class LableService {
    createLabel(data, id) {
        data.userID = id;
        return labelModel.createLabel(data)
            .then((result) => {
                logger.info('login token has verified')
                return ({ success: true, message: "Label Created Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ success: false, message: "Failed to created Label", status: statusCode.BadRequest });
            })
    }

    getUserAllLabelNote(id) {
        let userID = { userID: id }
        return labelModel.getUserAllLabelNote(userID)
            .then((result) => {
                return ({ message: "User All Lables Note Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Label Record is Not found", error: error, status: statusCode.NotFound });
            })
    }

    updateLabel(id, newData) {
        return labelModel.updateLabel(id, newData)
            .then((result) => {
                return ({ message: "Label Update Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Label is Not found", error: error, status: statusCode.NotFound });
            })
    }

    deleteLabel(id) {
        return labelModel.deleteLabel(id)
            .then((result) => {
                return ({ message: "Label Deleted Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Label Record is Not found", error: error, status: statusCode.NotFound });
            })
    }
}
module.exports = new LableService()
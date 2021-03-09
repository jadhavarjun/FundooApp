const noteModel = require('../Model/notesModel')
const statusCode = require('../Middleware/httpStatusCode.json')
const logger = require('../Middleware/winstenLogger')


class NoteService {

    noteInsert(data, id) {
        data.userID = id;
        return noteModel.createNote(data)
            .then((result) => {
                logger.info('login token has verified')
                return ({ success: true, message: "Notes Created Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ success: false, message: "Failed to created record", status: statusCode.BadRequest });
            })
    }

    getAllNotes() {
        return noteModel.getDataAll()
            .then((result) => {
                logger.info('Data Get Successfullly')
                return ({ message: "Employee Record", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Thier is No Employee record", error: error, status: statusCode.OK });
            })
    }
}
module.exports = new NoteService()
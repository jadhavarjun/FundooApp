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
                return ({ message: "Thier is No Employee record", error: error, status: statusCode.NotFound });
            })
    }

    updateNote(id, newData) {
        console.log("service update ''''''''''''''''''");
        return noteModel.updateNote(id, newData)
            .then((result) => {
                return ({ message: "Notes Update Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
            })
    }

    deleteNote(id) {
        return noteModel.deleteNote(id)
            .then((result) => {
                return ({ message: "Note Deleted Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Note Record is Not found", error: error, status: statusCode.NotFound });
            })
    }
    getUserAllNotes(id) {
        let userID = {userID: id}
        return noteModel.getUserAllNotes(userID)
            .then((result) => {
                return ({ message: "User All Notes Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Note Record is Not found", error: error, status: statusCode.NotFound });
            })
    }
}
module.exports = new NoteService()
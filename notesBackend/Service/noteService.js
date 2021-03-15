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

    updateNote(id, newData) {
        return noteModel.updateNote(id, newData)
            .then((result) => {
                return ({ message: "Notes Update Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
            })
    }
    archiveNote(id) {
        return noteModel.findOne(id)
            .then((data) => {
                let flag = { isArchive: false }
                if (data.isArchive == false) {
                    flag.isArchive = true;
                }
                return noteModel.updateNote(id, flag)
                    .then((result) => {
                        return ({ message: "Notes Archived Successfully", data: result, status: statusCode.OK });
                    })
                    .catch((error) => {
                        return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
                    })
            })
            .catch((error) => {
                return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
            })

    }

    trashNote(id) {
        return noteModel.findOne(id)
            .then((data) => {
                let flag = { isTrash: false }
                if (data.isTrash == false) {
                    flag.isTrash = true;
                }
                return noteModel.updateNote(id, flag)
                    .then((result) => {
                        return ({ message: "Notes Trash Successfully", data: result, status: statusCode.OK });
                    })
                    .catch((error) => {
                        return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
                    })
            })
            .catch((error) => {
                return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
            })
        // let flag = { isTrash: true }
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
        let userID = { userID: id }
        return noteModel.getUserAllNotes(userID)
            .then((result) => {
                return ({ message: "User All Notes Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Note Record is Not found", error: error, status: statusCode.NotFound });
            })
    }

    //attachLabel
    attachLabel(noteID, labelID) {
        // let label = { labelID:labelID }
        return noteModel.attachLabel(noteID, labelID)
            .then((result) => {
                return ({ message: "Label Attached Successfully", data: result, status: statusCode.OK });
            }).catch((err) => {
                return ({ message: "label Not Attached!!", error: err, status: statusCode.NotFound });
            });
    }
    //dettachFromLabel
    dettachFromLabel(noteID, labelID) {
        return noteModel.dettachFromLabel(noteID, labelID)
            .then((result) => {
                return ({ message: "Remove Note From Label Successfully", data: result, status: statusCode.OK });
            }).catch((err) => {
                return ({ message: "label Not Attached!!", error: err, status: statusCode.NotFound });
            });
    }

}
module.exports = new NoteService()
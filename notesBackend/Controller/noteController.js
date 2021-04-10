const statusCode = require('../Middleware/httpStatusCode.json')
const noteService = require('../Service/noteService')
const redisCache = require('../Middleware/redisCache')


const response = {};
class NoteController {

    noteCreate(req, res) {
        try {
            let id = req.decoded.id;
            noteService.noteInsert(req.body, id)
                .then((result) => {
                    redisCache.deleteCache(id)
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

    // noteGetData(req, res) {
    //     try {

    //         noteService.getAllNotes()
    //             .then((result) => {
    //                 response.data = result.data;
    //                 response.flag = true;
    //                 response.message = result.message;
    //                 res.status(result.status).send(response);
    //             }).catch((err) => {
    //                 response.flag = false;
    //                 response.data = err.message;
    //                 res.status(err.status).send(response);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    updateNote(req, res) {

        try {
            let userid = req.decoded.id;
            let newData = req.body;
            let id = req.params.id;
            noteService.updateNote(id, newData)
                .then((result) => {
                    redisCache.deleteCache(userid)
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

    archiveNote(req, res) {
        try {
            let userid = req.decoded.id;
            let id = req.params.id;
            noteService.archiveNote(id)
                .then((result) => {
                    redisCache.deleteCache(userid)
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


    trashNote(req, res) {
        try {
            let userid = req.decoded.id;
            let id = req.params.id;
            console.log("tttttttttttttttttttttttttt", id);
            noteService.trashNote(id)
                .then((result) => {
                    redisCache.deleteCache(userid)
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
    deleteNote(req, res) {
        try {
            let userid = req.decoded.id;
            let id = req.params.id;
            console.log("empid", id);
            noteService.deleteNote(id)
                .then((result) => {
                    redisCache.deleteCache(userid)
                    response.flag = true;
                    response.data = result.data;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.error("Employee Record is Not found Please Enter Correct One");
        }
    }

    getUserAllNotes(req, res) {
        try {
            let id = req.decoded.id;
            noteService.getUserAllNotes(id)
                .then((result) => {
                    console.log("Loading Data from database");
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    redisCache.loadCache(id, response)
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.message = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            console.error("Notes Record is Not found Please Enter Correct One");
        }
    }

    //attachLabel
    attachLabel(req, res) {
        let noteID = req.params.id;
        let labelID = req.body.labelID;
        noteService.attachLabel(noteID, labelID)
            .then((result) => {
                redisCache.loadCache(noteID, result.data)
                response.data = result.data;
                response.flag = true;
                response.message = result.message;
                res.status(result.status).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(err.status).send(response);
            });
    }

    //dettachFromLabel
    dettachFromLabel(req, res) {
        let noteID = req.params.id;
        let labelID = req.body.labelID;
        noteService.dettachFromLabel(noteID, labelID)
            .then((result) => {
                redisCache.loadCache(noteID, result.data)
                response.data = result.data;
                response.flag = true;
                response.message = result.message;
                res.status(result.status).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(err.status).send(response);
            });
    }

    //addCollabrator
    addCollabrator(req, res) {
        let noteID = req.params.id;
        let collabEmail = req.body.email;
        noteService.addCollabrator(noteID, collabEmail)
            .then((result) => {
                redisCache.loadCache(noteID, result.data)
                response.data = result.data;
                response.flag = true;
                response.message = result.message;
                res.status(result.status).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(err.status).send(response);
            });
    }

    removeCollabrator(req, res) {
        let noteID = req.params.id;
        let collabEmail = req.body.email;
        noteService.removeCollabrator(noteID, collabEmail)
            .then((result) => {
                redisCache.loadCache(noteID, result.data)
                response.data = result.data;
                response.flag = true;
                response.message = result.message;
                res.status(result.status).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(err.status).send(response);
            });
    }

    //search
    search(req, res) {
        let searchKey = req.body.searchKey;
        noteService.search(searchKey)
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
    }
}
module.exports = new NoteController();
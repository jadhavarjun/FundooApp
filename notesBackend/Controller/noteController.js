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
            let newData = req.body;
            let id = req.params.id;
            noteService.updateNote(id, newData)
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

    archiveNote(req, res) {
        try {
            let id = req.params.id;
            noteService.archiveNote(id)
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


    trashNote(req, res){
        try {
            let id = req.params.id;
            console.log("tttttttttttttttttttttttttt", id);
            noteService.trashNote(id)
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
    deleteNote(req, res) {
        try {
            let id = req.params.id;
            console.log("empid", id);
            noteService.deleteNote(id)
                .then((result) => {
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
                    redisCache.loadCache(id, result.data)
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
            console.error("Notes Record is Not found Please Enter Correct One");
        }
    }
}
module.exports = new NoteController();
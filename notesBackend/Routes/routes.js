const Controller = require('../Controller/userController')
const validate = require('../Middleware/validate');
const validator = require('../Middleware/validator');
const jwtToken = require("../Middleware/jwtToken");

const noteController = require('../Controller/noteController')

let userController = new Controller()
module.exports = (app) => {
    app.get("/user/get", userController.getData)

    app.post("/user/registration",validator.registration,validate.validation, userController.create)

    app.post("/user/login",validator.login,validate.validation, userController.login)

    app.post("/user/forgetpassword",validator.forgetPassword,validate.validation,userController.forgetPassword)

    app.post("/resetPassword/:token",jwtToken.forgetVerify,validator.forgetPassword,validate.validation,userController.resetPassword)

    //notes routes
    app.post("/note/create",jwtToken.tokenVerify,noteController.noteCreate)
    app.get("/note/getallnote", noteController.noteGetData)
    app.put("/note/update/:id",jwtToken.tokenVerify,noteController.updateNote)
    app.delete("/note/delete/:id", jwtToken.tokenVerify, noteController.deleteNote)
    app.post("/note/get_user_notes", jwtToken.tokenVerify, noteController.getUserAllNotes)
    app.post("/note/archive_note/:id", jwtToken.tokenVerify, noteController.archiveNote)
    app.post("/note/trash_note/:id", jwtToken.tokenVerify, noteController.trashNote)
} 
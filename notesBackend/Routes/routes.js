const Controller = require('../Controller/userController')
const validate = require('../Middleware/validate');
const validator = require('../Middleware/validator');
const jwtToken = require("../Middleware/jwtToken");
const redisCache = require ('../Middleware/redisCache')

const noteController = require('../Controller/noteController')
const labelController = require('../Controller/labelController')

let userController = new Controller()
module.exports = (app) => {
    app.get("/user/get", userController.getData)
    app.post("/user/registration",validator.registration,validate.validation, userController.create)
    app.post("/user/login",validator.login,validate.validation, userController.login)
    app.post("/user/forgetpassword",validator.forgetPassword,validate.validation,userController.forgetPassword)
    app.post("/resetPassword/:token",jwtToken.forgetVerify,validator.forgetPassword,validate.validation,userController.resetPassword)

    //notes routes
    app.post("/note/create",validator.createNote,validate.validation,jwtToken.tokenVerify,noteController.noteCreate)
    app.put("/note/update/:id",validator.createNote,validate.validation,jwtToken.tokenVerify,noteController.updateNote)
    app.delete("/note/delete/:id", jwtToken.tokenVerify, noteController.deleteNote)
    app.post("/note/get_user_notes", jwtToken.tokenVerify, redisCache.checkCache ,noteController.getUserAllNotes)
    app.post("/note/archive_note/:id", jwtToken.tokenVerify, noteController.archiveNote)
    app.post("/note/trash_note/:id", jwtToken.tokenVerify, noteController.trashNote)

    //label routes
    app.post("/label/create",jwtToken.tokenVerify,labelController.createLabel)
    app.post("/label/get_user_lable", jwtToken.tokenVerify, labelController.getUserAllLabelNote)
    app.put("/label/update/:id",jwtToken.tokenVerify,labelController.updateLabel)
    app.delete("/label/delete/:id",jwtToken.tokenVerify,labelController.deleteLabel)
} 
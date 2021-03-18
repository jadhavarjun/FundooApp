const Controller = require('../Controller/userController')
const validate = require('../Middleware/validate');
const validator = require('../Middleware/validator');
const jwtToken = require("../Middleware/jwtToken");
const redisCache = require ('../Middleware/redisCache');

const noteController = require('../Controller/noteController');
const labelController = require('../Controller/labelController');

let userController = new Controller()
module.exports = (app) => {
    app.get("/user/get", userController.getData);
    app.post("/user/registration",validator.registration,validate.validation, userController.create);
    app.post("/user/login",validator.login,validate.validation, userController.login);
    app.post("/user/forgetpassword",validator.forgetPassword,validate.validation,userController.forgetPassword);
    app.post("/user/resetPassword/:token",jwtToken.forgetVerify,validator.forgetPassword,validate.validation,userController.resetPassword);
    
    //notes routes
    app.post("/note",validator.createNote,validate.validation,jwtToken.tokenVerify,noteController.noteCreate);
    app.put("/note/:id",validator.createNote,validate.validation,jwtToken.tokenVerify,noteController.updateNote);
    app.delete("/note/:id", jwtToken.tokenVerify, noteController.deleteNote);
    app.get("/note", jwtToken.tokenVerify, redisCache.checkCache, noteController.getUserAllNotes);
    app.put("/note/:id/archive_note", jwtToken.tokenVerify, noteController.archiveNote);
    app.put("/note/:id/trash_note", jwtToken.tokenVerify, noteController.trashNote);
    app.put('/note/:id/add_label',jwtToken.tokenVerify, noteController.attachLabel);
    app.put("/note/:id/remove_label",jwtToken.tokenVerify, noteController.dettachFromLabel);
    app.put("/note/:id/add_collabrator", jwtToken.tokenVerify, noteController.addCollabrator)
    app.put("/note/:id/remove_collabration", jwtToken.tokenVerify, noteController.removeCollabrator)
    app.get("/note/search",jwtToken.tokenVerify,noteController.search)

    //label routes
    app.post("/label/create",jwtToken.tokenVerify,labelController.createLabel);
    app.get("/label/get_user_lable", jwtToken.tokenVerify, labelController.getUserAllLabelNote);
    app.put("/label/:id/update",jwtToken.tokenVerify,labelController.updateLabel);
    app.delete("/label/:id/delete",jwtToken.tokenVerify,labelController.deleteLabel);
    
} 
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

    app.post("/user/forgetpassword",userController.forgetPassword)

    app.post("/resetPassword/:token",jwtToken.forgetVerify,userController.resetPassword)

    //notes routes
    app.post("/note/create",jwtToken.tokenVerify,noteController.noteCreate)
    app.get("/note/getallnote", noteController.noteGetData)
} 
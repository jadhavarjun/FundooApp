const Controller = require('../Controller/userController')
const validate = require('../Middleware/validate');
const validator = require('../Middleware/validator');
const jwtToken = require("../Middleware/jwtToken");

let userController = new Controller()
module.exports = (app) => {
    app.get("/user/get", userController.getData)

    app.post("/user/registration",validator.registration,validate.validation, userController.create)

    app.post("/user/login",validator.login,validate.validation, userController.login)

    app.post("/user/forgetpassword",userController.forgetPassword)

    app.post("/resetPassword/:token",jwtToken.tokenVerify,userController.resetPassword)
} 
const Controller = require('../Controller/userController')
const validate = require('../Middleware/validate');
const validator = require('../Middleware/validator');
let userController = new Controller()
module.exports = (app) => {
    app.get("/userData/get", userController.getData)

    app.post("/user/registration",validator.registration,validate.validation, userController.create)

    app.post("/user/login",validator.login,validate.validation, userController.login)
} 
const Controller = require('../Controller/userController')
let userController = new Controller()
module.exports = (app) => {
    app.get("/userData/get", userController.getData)

    app.post("/user/registration", userController.create)

    app.post("/user/login", userController.login)
} 
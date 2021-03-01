const Controller = require('../Controller/userController')
let controller = new Controller()
module.exports = (app) => {
    app.get("/notes/get", controller.getData)

    // app.post("/employee/getById/:id", controller.findById)

    app.post("/notes/create", controller.create)

    // app.put("/employee/update/:id", controller.updateData)

    // app.delete("/employee/delete/:id", controller.deleteData)
} 
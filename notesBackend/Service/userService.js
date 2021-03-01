const bcrypt = require('bcrypt');
const empModel = require('../Model/userModel');

const objempModel = new empModel();

module.exports = class EmployeeService {
    insert(data) {
        const hash = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hash;
        return objempModel.create(data)
            .then((result) => {
                return ({ message: "Employee Record insert Successfully", data: result });
            })
            .catch((error) => {
                return ({ message: "Failed to inset Employee record", error: error });
            })
    }

    findAll() {
        return objempModel.findAll()
            .then((result) => {
                return ({ message: "Employee Record", data: result });
            })
            .catch((error) => {
                return ({ message: "Thier is No Employee record", error: error });
            })
    }

}
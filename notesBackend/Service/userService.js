const bcrypt = require('bcrypt');
const hashPassword = require('../Middleware/hashPassword');
const empModel = require('../Model/userModel');
const statusCode = require('../Middleware/httpStatusCode.json');
const logger = require('../Middleware/winstenLogger')


const objempModel = new empModel();

module.exports = class EmployeeService {
    insert(data) {
        // console.log(statusCode);
        let hash = hashPassword.hashPassword(data.password);
        data.password = hash;
        return objempModel.findOne(data.email)
            .then((result) => {
                if (result) {
                    return ({ success: false, message: "email already exit", data: result });
                }
                else {
                    return objempModel.create(data)
                        .then((result) => {
                            logger.info('login token has verified')
                            console.log("'''''''''''''''''''''''''''''''''''''''", result);
                            return ({ success: true, message: "Employee Record insert Successfully", data: result, status: statusCode.OK });
                        })
                        .catch((error) => {
                            return ({ success: false, message: "Failed to inset Employee record", error: statusCode.BadRequest });
                        })
                }
            })
            .catch((error) => {
                // console.log("==========================");
            })
    }

    findAll() {
        return objempModel.findAll()
            .then((result) => {
                logger.info('Data Get Successfullly')
                return ({ message: "Employee Record", data: result });
            })
            .catch((error) => {
                return ({ message: "Thier is No Employee record", error: error });
            })
    }
    //login
    login(data) {
        let email = data.email;
        let password = data.password;
        return objempModel.findOne(email)
            .then((result) => {
                if (result) {
                    return bcrypt.compare(password, result.password)
                        .then((res) => {
                            if (res) {
                                return ({ flag: true, message: "User Login Successfully!!", data: result, status: statusCode.OK });
                            }
                            else {
                                return ({ flag: false, message: "Password is Wrong", status: statusCode.NotFound });
                            }

                        });
                }
                else {
                    return ({ flag: false, message: "Please Enter Valid Email!!", status: statusCode.NotFound });
                }

            })

    }

}
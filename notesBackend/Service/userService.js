const bcrypt = require('bcrypt');
const hashPassword = require('../Middleware/hashPassword');
const empModel = require('../Model/userModel');
const statusCode = require('../Middleware/httpStatusCode.json');
const logger = require('../Middleware/winstenLogger');
const jwtToken = require('../Middleware/jwtToken');
const mailler = require('../Middleware/nodemailler')


const objempModel = new empModel();

module.exports = class EmployeeService {
    insert(data) {
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
                            return ({ success: true, message: "Employee Record insert Successfully", data: result, status: statusCode.OK });
                        })
                        .catch((error) => {
                            return ({ success: false, message: "Failed to inset Employee record", error: statusCode.BadRequest });
                        })
                }
            })
    }

    findAll() {
        return objempModel.findAll()
            .then((result) => {
                logger.info('Data Get Successfullly')
                return ({ message: "Employee Record", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Thier is No Employee record", error: error, status: statusCode.NotFound });
            })
    }
    //login
    login(data) {
        let email = data.email;
        let password = data.password;
        return objempModel.findOne(email)
            .then((result) => {
                if (result) {
                    return hashPassword.comparePassword(password, result.password)
                        .then((res) => {
                            if (res) {
                                let tokenData = {
                                    mail: result.email,
                                    id: result._id
                                }
                                let token = jwtToken.jwtToken(tokenData);
                                let dataObj = new Object();
                                dataObj._id = result._id;
                                dataObj.firstName = result.firstName;
                                dataObj.lastName = result.lastName;
                                dataObj.email = result.email;
                                dataObj.password = result.password;
                                dataObj.token = token;
                                // dataObj = result;
                                // dataObj.token = token;

                                return ({ flag: true, message: "User Login Successfully!!", data: dataObj, status: statusCode.OK });
                            }
                            else {
                                return ({ flag: false, message: "Password is Wrong", status: statusCode.Unauthorized });
                            }

                        });
                }
                else {
                    return ({ flag: false, message: "Please Enter Valid Email!!", status: statusCode.NotFound });
                }

            })
    }

    //forget Password
    forgetPassword(data) {
        let email = data.email;

        let tokenData = {
            email: email
        }
        return objempModel.findOne(email)
            .then((result) => {
                if (result) {
                    let token = jwtToken.jwtToken(tokenData);
                    mailler.mailer(email, token)
                    return ({ flag: true, message: "Please Check Your Mail For Reset Password!!", status: statusCode.OK });
                } else {
                    return ({ flag: false, message: "Email Not Exist Please Enter Valid Mail", status: statusCode.NotFound });
                }
            })
    }
    resetPassword(email, password) {
        let hash = hashPassword.hashPassword(password);
        return objempModel.resetPassword(email, hash)
            .then((result) => {
                if (result) {
                    return ({ flag: true, message: "Password has been successfully Changed!!", status: statusCode.OK });
                } else {
                    return ({ flag: false, message: "Something Went Wrong Please Do Forget Password Again!!", status: statusCode.BadRequest });
                }
            }).catch((err) => {
                return ({ flag: false, message: "Please Enter Valid Input!!", status: statusCode.NotFound });
            });

    }
    delete(id) {
        return objempModel.delete(id)
            .then((result) => {
                return ({ flag: true, message: "User Deleted Successfully!!", status: statusCode.OK });
            }).catch((err) => {
                return ({ flag: false, message: "Please Enter Valid User Details!!", status: statusCode.NotFound });
            });
    }
}
const mongoose = require('mongoose');

const keepNotes = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is Required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    }

});

let notesModel = mongoose.model('notes', keepNotes);

module.exports = class EmployeeModel {

    //Registration
    create = (data) => {
        return notesModel.create(data)
            .then((result) => {

                return result;
            })
            .catch((error) => {
                return error;
            })
    }

    findAll() {
        return notesModel.find({})
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return ({ message: "Something Went Wrong Please Check", error: error });
            })
    }

    //login find user with mailId
    findOne(mail) {
        return notesModel.findOne({ email: mail })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return ({ message: "Something Went Wrong Please Check", error: error });
            })

    }


}
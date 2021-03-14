const mongoose = require('mongoose');

const Schema = mongoose.Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    userID: {
        type: Schema.Types.ObjectId,//referencing other documents from other collections
        ref: 'notes', //userSchema
        require: true
    },
    colorNote: {
        type: String,
        default: "#ffffff"
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    isTrash: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

let userNoteModel = mongoose.model('userNote', noteSchema);

class NoteModel {

    createNote(data) {
        let noteData = new userNoteModel(data)
        return noteData.save(data)
            .then((result) => {
                return result;
            }).catch((error) => {
                return error;
            });
    }

    updateNote(id, newData) {
        return userNoteModel.findByIdAndUpdate(id, newData)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    deleteNote(id) {
        return userNoteModel.findByIdAndRemove(id)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    getUserAllNotes(id) {
        return userNoteModel.find(id)
            .populate('userID')
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    findOne(id) {
        return userNoteModel.findOne({ _id: id })
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch((error) => {
                console.log(error);
                return ({ message: "Something Went Wrong Please Check", error: error });
            })
    }
}

module.exports = new NoteModel()
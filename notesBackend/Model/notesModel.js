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
        type:Boolean,
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

    getDataAll() {
        return userNoteModel.find({})
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            })
    }

    updateNote(id, newData) {
        console.log("modedl data update ????????????????????????????", id, newData)
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
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }
}

module.exports = new NoteModel()
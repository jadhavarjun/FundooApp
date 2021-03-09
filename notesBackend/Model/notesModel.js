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
        default: null
    },

},
    {
        timestamps: true
    });

let userNoteModel = mongoose.model('userNote', noteSchema);

class NoteModel {

    createNote(data) {
        console.log("modedl data", data)
        let noteData = new userNoteModel(data)
        return noteData.save(data)
        .then((result) => {
            return result;
        }).catch((error) => {
            return ({ message: "Something Went Wrong Please Check", error: error });
        });
    }

    getDataAll() {
        return userNoteModel.find({})
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return ({ message: "Something Went Wrong Please Check", error: error });
            })
    }
}

module.exports = new NoteModel()
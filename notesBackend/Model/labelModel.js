const mongoose = require('mongoose');

const Schema = mongoose.Schema
const labelSchema = new mongoose.Schema({
    label: {
        type: String,
        require: true
    },
    userID: {
        type: Schema.Types.ObjectId,//referencing other documents from other collections
        // ref: 'notes',
        require: true
    },
},
    {
        timestamps: true
    });

let labelModel = mongoose.model('label', labelSchema);

class LabelModel {
    createLabel(data) {
        let labelData = new labelModel(data)
        return labelData.save(data)
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
    }

    getUserAllLabelNote(id) {
        return labelModel.find(id)
            // .populate('userID')
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })

    }

    updateLabel(id, newData) {
        return labelModel.findByIdAndUpdate(id, newData)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    deleteLabel(id) {
        console.log("idddddddddddddddddddddddddddd", id)
        return labelModel.findByIdAndRemove(id)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

}
module.exports = new LabelModel()
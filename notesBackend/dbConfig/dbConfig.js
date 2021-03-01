const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sample', {
    useNewUrlParser: true, useFindAndModify: false,
    useCreateIndex: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connection established Sucessfully!");
}).catch(() => {
    console.log("Failed to connect database");
})
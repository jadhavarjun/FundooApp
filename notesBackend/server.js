const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

//create express app
const app = express();

//parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())

//get post method imported
require('./Routes/routes')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
    require('./dbConfig/dbConfig');
});
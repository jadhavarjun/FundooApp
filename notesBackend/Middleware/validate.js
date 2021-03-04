const { validationResult } = require('express-validator')
let {InternalServer, UnprocessableEntity } = require('./httpStatusCode.json')
const logger = require('../Middleware/winstenLogger');

let response = {}

exports.validation =(req, res, next) => {
    try{
     
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            response.success=false,
            response.message = "you have filled invalid data"
            response.error = errors.array();
            logger.error(JSON.stringify(response));
            return res.status(UnprocessableEntity).send(response)
        }else{
           
            next();
        }
    }
    catch(error){
     
        response.success=false,
        response.message = "something went Wrong"
        logger.error(JSON.stringify(response));
        return res.status(InternalServer).send(response)
    }

}
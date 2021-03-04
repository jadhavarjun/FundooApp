const jwt = require('jsonwebtoken');

class JWTToken{
    jwtToken(tokenData){
        var token = jwt.sign(tokenData, 'shhhhh');
        return token;
    }
}
module.exports = new JWTToken();
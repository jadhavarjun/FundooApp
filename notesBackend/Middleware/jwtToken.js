const jwt = require('jsonwebtoken');
const logger = require('./winstenLogger');

class JWTToken {
    jwtToken(tokenData) {
        var token = jwt.sign(tokenData, 'shhhhh');
        return token;
    }

    forgetVerify(req, res, next) {
        console.log("from tokenverify")
        // var token = req.body['login_key'];
        let token = req.params.token;
        if (token) {
            jwt.verify(token, process.env.JWT_LOGIN_KEY, (err, decoded) => {
                if (err) {
                    logger.error('invalid token or token has expired')
                    return res.send({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    logger.info('login token has verified')
                    console.log("verified")
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            logger.error('No token provided...')
            return res.send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

    tokenVerify(req, res, next) {
        console.log("from tokenverify")
        // var token = req.body['login_key'];
        let token = req.headers.token;
        console.log("????????????????????????????????n",req.headers);
        if (token) {
            jwt.verify(token, process.env.JWT_LOGIN_KEY, (err, decoded) => {
                if (err) {
                    logger.error('invalid token or token has expired')
                    return res.send({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    logger.info('login token has verified')
                    // console.log("verified")
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            logger.error('No token provided...')
            return res.send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

}
module.exports = new JWTToken();
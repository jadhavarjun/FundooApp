const bcrypt = require('bcrypt');

//encrypt
class userHashPassword {
    hashPassword(password) {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
    }
    //dcrypt
    comparePassword(password, hash) {
        let result = bcrypt.compare(password, hash)
        return result;
    }
}
module.exports = new userHashPassword();
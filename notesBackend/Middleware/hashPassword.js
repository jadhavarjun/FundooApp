const bcrypt = require('bcrypt');

//encrypt
class userHashPassword {
    hashPassword(password) {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
    }
    //dcrypt
    decryptPassword(password, hash, callback) {
        return bcrypt.compare(password, hash)
            .then((result) => {
                return result;
            });
    }
}
module.exports = new userHashPassword();
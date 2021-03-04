const bcrypt = require('bcrypt');

//encrypt
class userHashPassword {
    hashPassword(password) {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
    }
    //dcrypt
    comparePassword =(password, hash,next)=>{
        try{
            return new Promise((resolve,reject)=>{
                bcrypt.compare(password, hash).then(data=>{
                    resolve(data ?true:false);
                }).catch(err=>{
                    reject(err)
                })
            })

        }catch(error){
            next(error)
        }

    // decryptPassword(password, hash) {
    //     return bcrypt.compare(password, hash)
    //         .then((result) => {
    //             return result;
    //         });
    }
}
module.exports = new userHashPassword();
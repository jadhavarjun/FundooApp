const request = require('supertest');
const app = require('../server')

let authToken = "";
let userID = "";
describe('User Test', function () {
    it('should return success response,message and token', async () => {
        const response = await request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                "email": "patilpradip@gmail.com",
                "password": "pradip@143"
            })
        authToken = response.body.data.token;
        expect(response.body.sucess).toBe(true);
        expect(response.body.message).toBe("User Login Successfully!!");
    });

    it('should return success response and message when user registered', async () => {
        const response = await request(app)
            .post('/user/registration')
            .set('Accept', 'application/json')
            .send({
                "firstName": "Pravin",
                "lastName": "Jadhav",
                "email": "jadhavpravin@gmail.com",
                "password": "pravin@143"
            })
            userID = response.body.data._id;
        expect(response.body.sucess).toBe(true);
        expect(response.body.message).toBe("Employee Record insert Successfully");

    });
    it('should return success response,message when user deleted', async () => {
        const response = await request(app)
            .delete(`/user/delete/${userID}`)
            .set('Accept', 'application/json')
        authToken = response.body.data.token;
        expect(response.body.sucess).toBe(true);
        expect(response.body.message).toBe("User Deleted Successfully!!");
    });
});
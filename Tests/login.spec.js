const test = require('supertest/lib/test');
const config = require('../config')
const request = require('supertest')(config.baseURL);

describe('API ServRest - Login', () => {

    it('Deve ser possível realizar o login com sucesso', async () => {
        const res = await request
            .post('/login')
            .send({
                "email": "teste346@gmail.com",
                "password": "123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Login realizado com sucesso');
        expect(res.body.authorization).toBeTruthy()

    });
});

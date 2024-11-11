const config = require('../config')
const request = require('supertest')(config.baseURL);
const massaUser = require('../api/fixtures/userMassa');

describe('TDD API ServRest - User', () => {

  let userId;

  massaUser.forEach(({ nome, email, password, administrador, nomePut }) => {
    const user = {
      nome,
      email,
      password,
      administrador,
    };

    it(`POST - Deve ser possível adicionar um usuário (email=${email})`, async () => {
      const res = await request
        .post('/usuarios')
        .send(user);

      userId = res.body._id;

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Cadastro realizado com sucesso');
      expect(res.body._id).toBe(userId);
    });

    it(`GET - Deve ser possível consultar o usuário ${nome}`, async () => {
      const res = await request
        .get(`/usuarios/${userId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.nome).toBe(nome);
      expect(res.body.email).toBe(email);
      expect(res.body.password).toBe(password);
      expect(res.body.administrador).toBe(administrador);
      expect(res.body._id).toBe(userId);
    });

    it(`PUT - Deve ser possível editar o usuário (email=${email})`, async () => {
      user.nome = nomePut;

      const res = await request
        .put(`/usuarios/${userId}`)
        .send(user)

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Registro alterado com sucesso');
    });

    it(`DELETE - Deve ser possível deletar o usuário (email=${email})`, async () => {
      const res = await request
        .delete(`/usuarios/${userId}`)

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Registro excluído com sucesso');
    });
  });
});

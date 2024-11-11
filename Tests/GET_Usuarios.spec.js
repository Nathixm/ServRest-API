const config = require('../config')
const request = require('supertest')(config.baseURL);

describe('API ServRest - User', () => {

  let todosUsuarios;

  beforeAll(async () => {
    const res = await request
      .get('/usuarios')
    todosUsuarios = res.body.usuarios
  });

  it(`Deve ser possível consultar o usuário escolhido`, async () => {
    const usuarioDeTeste = todosUsuarios[5]
    const res = await request
      .get(`/usuarios/${usuarioDeTeste._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe(usuarioDeTeste.nome);
    expect(res.body.email).toBe(usuarioDeTeste.email);
    expect(res.body.password).toBe(usuarioDeTeste.password);
    expect(res.body.administrador).toBe(usuarioDeTeste.administrador);
    expect(res.body._id).toBe(usuarioDeTeste._id);
  });
});


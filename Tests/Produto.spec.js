const config = require('../config')
const request = require('supertest')(config.baseURL);
const massaproduto = require('../api/fixtures/produtoMassa');

describe('TDD API ServRest - Product', () => {
  let token;
  let productId;

  beforeEach(async () => {
    const res = await request
      .post('/login')
      .send({
        "email": "teste346@gmail.com",
        "password": "123"
      });

    token = res.body.authorization
  });

  massaproduto.forEach(({ nome, preco, descricao, quantidade, precoPut }) => {
    const product = {
      nome,
      preco,
      descricao,
      quantidade,
    };

    it(`POST - Deve ser possível adicionar um novo produto (descricao=${descricao}`, async () => {
      const res = await request
        .post('/produtos')
        .set("Authorization", token)
        .send(product)

      productId = res.body._id;

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Cadastro realizado com sucesso');
      expect(res.body._id).toBe(productId); // Verifica se o ID foi retornado
    });

    it(`GET - Deve ser possível consultar o novo produto cadastrado (descricao=${descricao})`, async () => {
      const res = await request
        .get(`/produtos/${productId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.nome).toBe(nome);
      expect(res.body.preco).toBe(preco);
      expect(res.body.descricao).toBe(descricao);
      expect(res.body.quantidade).toBe(quantidade);
      expect(res.body._id).toBe(productId);
    });

    it(`PUT - Deve ser possível editar o novo produto (descricao=${descricao})`, async () => {
      product.preco = precoPut;

      const res = await request
        .put(`/produtos/${productId}`)
        .set("Authorization", token)
        .send(product)

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Registro alterado com sucesso');
    });

    it(`DELETE - Deve ser possível deletar o novo produto (descricao=${descricao})`, async () => {
      const res = await request
        .delete(`/produtos/${productId}`)
        .set("Authorization", token)

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Registro excluído com sucesso');
    });
  });
});
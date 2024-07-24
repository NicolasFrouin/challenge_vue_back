const request = require('supertest');
const express = require('express');
const AuthRouter = require('../../src/entities/auth/router');
const AuthController = require('../../src/entities/auth/controller');
const { authJwtMiddleware } = require('../../src/lib/authentication');

jest.mock('../../src/entities/auth/controller');
jest.mock('../../src/lib/authentication');

describe('AuthRouter', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', AuthRouter.getRouter());
    authJwtMiddleware.mockImplementation(() => (req, res, next) => next());
  });

  test('POST /login should call AuthController.login', async () => {
    await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
    expect(AuthController.login).toHaveBeenCalled();
  });

  test('POST /register should call AuthController.register', async () => {
    await request(app).post('/register').send({ email: 'test@example.com', password: 'password', firstname: 'First', lastname: 'Last', role: 'user' });
    expect(AuthController.register).toHaveBeenCalled();
  });

  test('POST /refresh should call AuthController.refresh', async () => {
    await request(app).post('/refresh').send();
    expect(AuthController.refresh).toHaveBeenCalled();
  });

  test('GET /me should call AuthController.me', async () => {
    await request(app).get('/me').send();
    expect(AuthController.me).toHaveBeenCalled();
  });
});
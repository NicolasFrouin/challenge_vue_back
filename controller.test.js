const AuthController = require('../../src/entities/auth/controller');
const AuthService = require('../../src/entities/auth/service');
const { generateAccessToken, generateRefreshToken } = require('../../src/lib/authentication');

jest.mock('../../src/entities/auth/service');
jest.mock('../../src/lib/authentication');

describe('AuthController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, user: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    jest.clearAllMocks();
  });

  test('login should return user data and tokens on successful login', async () => {
    req.body = { email: 'test@example.com', password: 'password' };
    const userData = { id: 1, email: req.body.email, role: 'user' };
    AuthService.login.mockResolvedValue({ code: 200, data: userData });
    generateAccessToken.mockReturnValue('accessToken');
    generateRefreshToken.mockReturnValue('refreshToken');

    await AuthController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      ...userData,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    });
  });

  test('register should return user data on successful registration', async () => {
    req.body = { email: 'test@example.com', password: 'password', firstname: 'First', lastname: 'Last', role: 'user' };
    const userData = { id: 1, ...req.body };
    AuthService.register.mockResolvedValue({ code: 201, data: userData });

    await AuthController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(userData);
  });

  test('refresh should return new access token', async () => {
    req.user = { id: 1, email: 'test@example.com', role: 'user' };
    const token = 'newAccessToken';
    AuthService.refreshAccessToken.mockResolvedValue({ code: 200, data: { accessToken: token } });

    await AuthController.refresh(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ accessToken: token });
  });

  test('me should return user data', async () => {
    req.user = { id: 1, email: 'test@example.com', role: 'user' };

    await AuthController.me(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(req.user);
  });
});
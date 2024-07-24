const AuthService = require('../../src/entities/auth/service');
const { User } = require('../../src/models');
const { Return } = require('../../src/lib');
const { generateAccessToken } = require('../../src/lib/authentication');

jest.mock('../../src/models');
jest.mock('../../src/lib');
jest.mock('../../src/lib/authentication');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login should return user data on successful login', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const userData = { id: 1, email };

    User.login.mockResolvedValue(userData);
    Return.from.mockReturnValue({ code: 200, data: userData });

    const result = await AuthService.login(email, password);
    expect(result).toEqual({ code: 200, data: userData });
  });

  test('register should return user data on successful registration', async () => {
    const user = { email: 'test@example.com', password: 'password', firstname: 'First', lastname: 'Last', role: 'user' };
    const userData = { id: 1, ...user };

    User.create.mockResolvedValue(userData);
    Return.from.mockReturnValue({ code: 201, data: userData });

    const result = await AuthService.register(user);
    expect(result).toEqual({ code: 201, data: userData });
  });

  test('refreshAccessToken should return new access token', async () => {
    const id = 1;
    const user = { id, email: 'test@example.com', role: 'user' };
    const token = 'newAccessToken';

    User.findByPk.mockResolvedValue(user);
    generateAccessToken.mockReturnValue(token);

    const result = await AuthService.refreshAccessToken(id, user);
    expect(result).toEqual({ code: 200, data: { accessToken: token } });
  });
});
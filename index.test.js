const { authRouter, authController, authService } = require('../../src/entities/auth/index');

describe('index', () => {
  test('should export authRouter', () => {
    expect(authRouter).toBeDefined();
  });

  test('should export authController', () => {
    expect(authController).toBeDefined();
  });

  test('should export authService', () => {
    expect(authService).toBeDefined();
  });
});
export const userFindFirstMock = jest.fn();
export const userCreateMock = jest.fn();
export const userAuthenticationTokenFindFirstMock = jest.fn();
export const userAuthenticationTokenCreateMock = jest.fn();

export const prismaClient = {
  user: {
    findFirst: jest.fn(),
    create: jest.fn()
  },
  userAuthenticationToken: {
    findFirst: jest.fn(),
    create: jest.fn()
  }
}
export const userFindFirstMock = jest.fn();
export const userCreateMock = jest.fn();

export const userAuthenticationTokenFindFirstMock = jest.fn();
export const userAuthenticationTokenCreateMock = jest.fn();

export const userOrganisationFindFirstMock = jest.fn();
export const userOrganisationCreateMock = jest.fn();

export const exceptionEventCreateMock = jest.fn();

export const prismaClient = {
  user: {
    findFirst: userFindFirstMock,
    create: userCreateMock
  },
  userAuthenticationToken: {
    findFirst: userAuthenticationTokenFindFirstMock,
    create: userAuthenticationTokenCreateMock
  },
  userOrganisation: {
    findFirst: userOrganisationFindFirstMock,
    create: userOrganisationCreateMock
  },
  exceptionEvent: {
    create: exceptionEventCreateMock
  }
}
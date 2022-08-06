import { AppHttpServer } from ".";

jest.mock("express", () => {
  return {
    default: jest.fn().mockReturnValue({
      use: jest.fn(),
      listen: (port: number, callback: Function) => callback(),
    }),
    __esModule: true,
    json: jest.fn(),
  }
})

beforeEach(() => {
  jest.clearAllMocks();  
})

describe("http-server", () => {
  describe("AppHttpServer.start", () => {
    test("When start is called, the promise resolves to be undefined", () => {
      expect(AppHttpServer.start()).resolves.toEqual(undefined)
    })
  })
})
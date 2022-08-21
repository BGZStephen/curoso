import { AppHttpServer } from ".";

jest.mock("express", () => require("../../../_mocks_/express"))

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
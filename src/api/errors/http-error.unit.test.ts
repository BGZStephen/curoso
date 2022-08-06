import { HttpError } from "./http-error"

describe("http-error", () => {
  describe("HttpError", () => {
    test("Http Error is instanciated with the correct properties", () => {
      const message = "Foo";
      const statusCode = 400;
      const error = new HttpError(message, statusCode);

      expect(error.message).toEqual(message)
      expect(error.statusCode).toEqual(statusCode)
    })
  })
})
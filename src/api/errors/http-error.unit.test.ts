import { ForbiddenError, HttpError, UnauthorizedError } from "./http-error"

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

  describe("ForbiddenError", () => {
    test("ForbiddenError is instanciated with the correct properties", () => {
      const error = new ForbiddenError();

      expect(error.message).toEqual("Forbidden")
      expect(error.statusCode).toEqual(403)
    })
  })

  describe("UnauthorizedError", () => {
    test("UnauthorizedError is instanciated with the correct properties", () => {
      const error = new UnauthorizedError();

      expect(error.message).toEqual("Unauthorized")
      expect(error.statusCode).toEqual(401)
    })
  })
})
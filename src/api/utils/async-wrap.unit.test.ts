import { Request, Response } from "express";
import { asyncwrap } from "./async-wrap";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("async-wrap", () => {
  describe("asyncwrap", () => {
    test("wraps and calls an async function with a catch", () => {
      const catchSpy = jest.fn()
      const fnSpy = jest.fn().mockReturnValue({
        catch: catchSpy
      })
      const request = {} as Request
      const response = {} as Response

      const wrappedFunction = asyncwrap(fnSpy)
      const res = wrappedFunction(request, response, jest.fn());

      expect(wrappedFunction).toBeDefined()
      expect(res).toBe(undefined)
      expect(fnSpy).toHaveBeenCalled()
      expect(catchSpy).toHaveBeenCalled()
    })
  })
})
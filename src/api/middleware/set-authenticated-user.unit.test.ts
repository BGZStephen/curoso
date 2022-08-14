import { Request, Response } from "express"
import { userAuthenticationTokenFindFirstMock } from "../clients/_mocks_/prisma";
import { HttpError } from "../errors/http-error";
import { generateUser } from "../test-utils/user";
import { Context } from "./context";
import { setAuthenticatedUser } from "./set-authenticated-user";

jest.mock("../clients/prisma", () => require("../clients/_mocks_/prisma"))

beforeAll(() => {
  jest.clearAllMocks()
})

describe("set-authenticated-user", () => {
  describe("setAuthenticatedUser", () => {
    test("When no context is available, throws an error", async () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      await expect(setAuthenticatedUser(req, res, next)).rejects.toThrow(new HttpError("Something went wrong", 400))
    })

    test("When no auth header is found, calls next without searching for a user", async () => {
      const req = {
        headers: {}
      } as Request;
      const res = {} as Response;
      const next = jest.fn();

      Context.bind(req);

      await expect(setAuthenticatedUser(req, res, next)).resolves.toBe(undefined)
      expect(userAuthenticationTokenFindFirstMock).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    test("When no user authentication token is found, calls next without setting an authenticated user to context", async () => {
      const req = {
        headers: {
          authorization: "Bearer authorization"
        }
      } as Request;
      const res = {} as Response;
      const next = jest.fn();

      const ctx = Context.bind(req);

      await expect(setAuthenticatedUser(req, res, next)).resolves.toBe(undefined)
      expect(userAuthenticationTokenFindFirstMock).toHaveBeenCalledWith({
        where: {
          token: "authorization"
        },
        select: {
          user: true
        }
      })
      expect(ctx.authenticatedser).toBe(null)
      expect(next).toHaveBeenCalled()
    })

    test("When a user authentication token is found, calls next, setting an authenticated user to context", async () => {
      const req = {
        headers: {
          authorization: "Bearer authorization"
        }
      } as Request;
      const res = {} as Response;
      const next = jest.fn();

      const ctx = Context.bind(req);

      const user = generateUser()

      userAuthenticationTokenFindFirstMock.mockResolvedValue({ user })

      await expect(setAuthenticatedUser(req, res, next)).resolves.toBe(undefined)
      expect(userAuthenticationTokenFindFirstMock).toHaveBeenCalledWith({
        where: {
          token: "authorization"
        },
        select: {
          user: true
        }
      })
      expect(ctx.authenticatedser).toBe(user)
      expect(next).toHaveBeenCalled()
    })
  })
})
import { Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../errors/http-error";
import { generateUser } from "../test-utils/user";
import { createUserHAndler } from "./create-user";

jest.mock("../clients/prisma", () => require("../clients/_mocks_/prisma"))

beforeEach(() => {
  jest.clearAllMocks();
})

describe("create-user", () => {
  describe("createUserHAndler", () => {
    test("When an existing user is found, throws an HTTP Error", async () => {
      const user = generateUser();
      const req = {
        body: user
      } as Request;
      const res = {
        json: jest.fn()
      } as any as Response

      require("../clients/_mocks_/prisma").prismaClient.user.findFirst.mockResolvedValue({
        user
      })

      await expect(createUserHAndler(req, res)).rejects.toThrow(new HttpError("A user with that email address already exists", 400))
      expect(res.json).not.toHaveBeenCalled()
    })

    test("Creates a user based on the user creation params passed in", async () => {
      const user = generateUser();
      const req = {
        body: user
      } as Request;
      const res = {
        json: jest.fn()
      } as any as Response

      require("../clients/_mocks_/prisma").prismaClient.user.findFirst.mockResolvedValue(null)
      require("../clients/_mocks_/prisma").prismaClient.user.create.mockResolvedValue(user)

      await expect(createUserHAndler(req, res)).resolves.toEqual(undefined)
      expect(res.json).toHaveBeenCalledWith(user)
    })

    test("Throws an error when the request body does not contain the required parameters", async () => {
      const req = {
        body: null
      } as Request;
      const res = {
        json: jest.fn()
      } as any as Response

      await expect(createUserHAndler(req, res)).rejects.toThrow(new ZodError([
        {
          code: "invalid_type",
          expected: "object",
          received: "null",
          path: [],
          message: "Unexpected body, expected an object containing email, firstName, lastName and password"
        }
      ]))
      expect(res.json).not.toHaveBeenCalled()
    })

    test("Throws an error when the provided password is not strong enough", async () => {
      const user = generateUser({ password: "weak" });
      const req = {
        body: user
      } as Request;
      const res = {
        json: jest.fn()
      } as any as Response

      await expect(createUserHAndler(req, res)).rejects.toThrow(new ZodError([
        {
          validation: "regex",
          code: "invalid_string",
          message: "Password must contain 1 uppercase character, 1 lowercase character, 1 special character, 1 number and be over 8 characters in length",
          path: [
            "password"
          ],
        }
      ]))
      expect(res.json).not.toHaveBeenCalled()
    })
  })
})
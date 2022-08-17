import { Request, Response } from "express"
import { userOrganisationFindFirstMock } from "../clients/_mocks_/prisma";
import { ForbiddenError, HttpError, UnauthorizedError } from "../errors/http-error";
import { generateOrganisation } from "../test-utils/organisation";
import { generateUser } from "../test-utils/user";
import { generateUserOrganisation } from "../test-utils/user-organisation";
import { Context } from "./context";
import { setOrganisation } from "./set-organisation";

jest.mock("../clients/prisma", () => require("../clients/_mocks_/prisma"))

beforeAll(() => {
  jest.clearAllMocks()
})

describe("set-organisation", () => {
  describe("setOrganisation", () => {
    test("When no context is available, throws an error", async () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      await expect(setOrganisation(req, res, next)).rejects.toThrow(new HttpError("Something went wrong", 400))
    })

    test("When no authenticated user is available on the context, throws an error", async () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      const ctx = Context.bind(req);

      ctx.authenticatedser = null

      await expect(setOrganisation(req, res, next)).rejects.toThrow(new UnauthorizedError())
    })

    test("When no organisation is found, throws an error", async () => {
      const req = {
        headers: {}
      } as Request;
      const res = {} as Response;
      const next = jest.fn();

      const ctx = Context.bind(req);

      ctx.authenticatedser = generateUser();

      userOrganisationFindFirstMock.mockResolvedValue(null)

      await expect(setOrganisation(req, res, next)).rejects.toThrow(new ForbiddenError())
    })

    test("When a organisation is found, sets it on the context", async () => {
      const req = {
        headers: {}
      } as Request;
      const res = {} as Response;
      const next = jest.fn();
      const user = generateUser();
      const organisation = generateOrganisation();
      const userOrganisation = generateUserOrganisation({userId: user.id, organisationId: organisation.id })

      const ctx = Context.bind(req);

      ctx.authenticatedser = generateUser();

      userOrganisationFindFirstMock.mockResolvedValue({ ...userOrganisation, organisation })

      await expect(setOrganisation(req, res, next)).resolves.toBe(undefined);
      expect(ctx.organisation).toEqual(organisation)
    })
  })
})
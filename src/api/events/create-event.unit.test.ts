import { EventType } from "@prisma/client"
import { Request, Response } from "express"
import { eventCreateMock } from "../clients/_mocks_/prisma"
import { UnauthorizedError } from "../errors/http-error"
import { Context } from "../middleware/context"
import { generateOrganisation } from "../test-utils/organisation"
import { hydrateEventFromRequestBody, CreateEventHandlerBody, createEventHandler } from "./create-event"

jest.mock("../clients/prisma", () => require("../clients/_mocks_/prisma"))

beforeEach(() => {
  jest.clearAllMocks();
})

describe("create-event", () => {
  describe("createEventHandler", () => {
    test("Throws an error if the request body contents are invalid", async () => {
      const req = {
        body: {}
      } as Request;
      const res = {} as Response;

      await expect(createEventHandler(req, res)).rejects.toThrowError();
    })

    test("Throws an error if there is no organisation within the context", async () => {
      const req = {
        body: {
          type: EventType.EXCEPTION,
          displayName: "displayName",
          createdAt: new Date().toISOString(),
          content: "content",
          metadata: {},
          identifiers: {}
        }
      } as Request;
      const res = {} as Response;

      await expect(createEventHandler(req, res)).rejects.toThrow(new UnauthorizedError());
    })

    test("Calls prisma create when all validation passes", async () => {
      const now = new Date();

      const body = {
        type: EventType.EXCEPTION,
        displayName: "displayName",
        createdAt: now.toISOString(),
        content: "content",
        metadata: {},
        identifiers: {}
      }
      const req = {
        body
      } as Request;
      const res = {
        sendStatus: jest.fn(),
      } as any as Response;
      const organisation = generateOrganisation({})

      const ctx = Context.bind(req);
      ctx.organisation = organisation;

      eventCreateMock.mockImplementationOnce((value) => value)

      await expect(createEventHandler(req, res)).resolves.toBe(undefined)

      expect(eventCreateMock).toHaveBeenCalledWith({data: {
        ...body,
        createdAt: now,
        metadata: JSON.stringify({}),
        identifiers: JSON.stringify({}),
        organisationId: organisation.id,  
      }})
      expect(res.sendStatus).toHaveBeenCalledWith(200)
    })
  })

  describe("hydrateEventFromRequestBody", () => {
    test("Returns a hydrated event", () => {
      const body: CreateEventHandlerBody = {
        type: EventType.EXCEPTION,
        displayName: "displayName",
        createdAt: new Date(),
        content: "content",
        metadata: { id: "1" },
        identifiers: { id: "1" }
      }
      const organisationId = "1"
      const stringifiedIdentifiers = JSON.stringify({ id: "1" })
      
      expect(hydrateEventFromRequestBody(body, organisationId)).toEqual({
        ...body,
        organisationId,
        metadata: stringifiedIdentifiers, 
        identifiers: stringifiedIdentifiers
      })
    })
  })
})
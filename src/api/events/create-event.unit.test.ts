import { hydrateEventFromRequestBody, EventType, CreateEventHandlerBody } from "./create-event"

describe("create-event", () => {
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
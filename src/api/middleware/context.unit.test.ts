import { Request } from "express"
import { generateOrganisation } from "../test-utils/organisation";
import { generateUser } from "../test-utils/user";
import { Context } from "./context"

describe("Context", () => {
  test("Setting an authenticated user allows it to be accessible", () => {
    const req = {} as Request;

    const ctx = Context.bind(req)

    const user = generateUser()

    ctx.authenticatedser = user;

    const gottenCtx = Context.get(req)

    expect(gottenCtx?.authenticatedser).toEqual(user)
  })

  test("Setting an organisation allows it to be accessible", () => {
    const req = {} as Request;

    const ctx = Context.bind(req)

    const organisation = generateOrganisation()

    ctx.organisation = organisation;

    const gottenCtx = Context.get(req)

    expect(gottenCtx?.organisation).toEqual(organisation)
  })

  test("Requesting a context now set will return null", () => {
    const req = { foo: "bar" } as any as Request;
    const gottenCtx = Context.get(req)

    expect(gottenCtx).toEqual(null)
  })
})
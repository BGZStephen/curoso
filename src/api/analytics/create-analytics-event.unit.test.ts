import { HttpError } from "../errors/http-error";
import { generateUser } from "../test-utils/user";
import { createAnalyticsEvent } from "./create-analytics-event";

jest.mock("../clients/prisma", () => require("../clients/_mocks_/prisma"))

beforeEach(() => {
  jest.clearAllMocks();
})

describe("create-analytics-event", () => {
  describe("createAnalyticsEvent", () => {
    test("When an existing user is found, throws an HTTP Error", async () => {
      const user = generateUser();

      require("../clients/_mocks_/prisma").prismaClient.user.findFirst.mockResolvedValue({
        user
      })

      await expect(createAnalyticsEvent(user)).rejects.toThrow(new HttpError("A user with that email address already exists", 400))
    })

    test("Creates a user based on the user creation params passed in", async () => {
      const user = generateUser();

      require("../clients/_mocks_/prisma").prismaClient.user.findFirst.mockResolvedValue(null)
      require("../clients/_mocks_/prisma").prismaClient.user.create.mockResolvedValue(user)

      await expect(createAnalyticsEvent(user)).resolves.toEqual(user)
    })
  })
})
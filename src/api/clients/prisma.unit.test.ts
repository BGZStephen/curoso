import { prismaClient } from "./prisma";

jest.mock("../../generated/prisma", () => ({
  PrismaClient: jest.fn().mockImplementation(() => {}),
}));

describe("prisma", () => {
  describe("prismaClient", () => {
    test("prismaClient is an instance of PrismaClient", () => {
      expect(prismaClient).toBeInstanceOf(
        require("../../generated/prisma").PrismaClient
      );
    });
  });
});

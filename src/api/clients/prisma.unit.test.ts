import { prismaClient } from "./prisma";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => {}),
}));

describe("prisma", () => {
  describe("prismaClient", () => {
    test("prismaClient is an instance of PrismaClient", () => {
      expect(prismaClient).toBeInstanceOf(
        require("@prisma/client").PrismaClient
      );
    });
  });
});

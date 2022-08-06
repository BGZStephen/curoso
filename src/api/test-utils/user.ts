import { User } from "../../generated/prisma";
import cuid from "cuid"

export function generateUser(overrides: Partial<User> = {}): User {
  const now = new Date();

  const user: User = {
    id: cuid(),
    createdAt: now,
    updatedAt: now,
    firstName: "john",
    lastName: "doe",
    email: "john.doe@test.com",
    password: cuid(),
    lastLogin: now,
    ...overrides
  }

  return user;
}
import { User } from "@prisma/client";
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
    password: "Password123!",
    lastLogin: now,
    ...overrides
  }

  return user;
}
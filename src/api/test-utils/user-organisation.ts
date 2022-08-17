import { UserOrganisation } from "@prisma/client";
import cuid from "cuid"

export function generateUserOrganisation(overrides: Partial<UserOrganisation> = {}): UserOrganisation {
  const userOrganisation: UserOrganisation = {
    id: cuid(),
    userId: cuid(),
    organisationId: cuid(),
    ...overrides
  }

  return userOrganisation;
}
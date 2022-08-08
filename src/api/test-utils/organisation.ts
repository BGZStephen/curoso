import { Organisation } from "@prisma/client";
import cuid from "cuid"

export function generateOrganisation(overrides: Partial<Organisation> = {}): Organisation {
  const now = new Date();

  const organisation: Organisation = {
    id: cuid(),
    createdAt: now,
    updatedAt: now,
    name: "name",
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    city: "city",
    country: "country",
    postcode: "postcode",
    ...overrides
  }

  return organisation;
}
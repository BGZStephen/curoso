import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../clients/prisma";
import { HttpError } from "../errors/http-error";
import { Context } from "./context";

export async function parseOrganisationId(req: Request, res: Response, next: NextFunction) {
  const ctx = Context.get(req)

  if (!ctx) {
    throw new HttpError("Something went wrong", 400)
  }

  if (!ctx.authenticatedser) {
    throw new HttpError("Unauthorized", 401)
  }

  const userOrganisation = await prismaClient.userOrganisation.findFirst({
    where: {
      userId: ctx.authenticatedser.id
    },
    select: {
      organisation: true
    }
  })

  if (!userOrganisation) {
    throw new HttpError("Forbidden", 403)
  }

  ctx.organisation = userOrganisation.organisation

  next()
}
import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../clients/prisma";
import { HttpError } from "../errors/http-error";
import { Context } from "./context";

export async function setAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
  const ctx = Context.get(req)

  if (!ctx) {
    throw new HttpError("Something went wrong", 400)
  }

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || typeof req.headers.authorization !== "string") {
    return next()
  }

  const userAuthenticationToken = await prismaClient.userAuthenticationToken.findFirst({
    where: {
      token: req.headers.authorization.split("Bearer ")[1]
    },
    select: {
      user: true
    }
  })

  if (userAuthenticationToken) {
    ctx.authenticatedser = userAuthenticationToken.user
  }

  next()
}
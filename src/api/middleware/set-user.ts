import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../clients/prisma";
import { HttpError } from "../errors/http-error";
import { Context } from "./context";

export async function setUser(req: Request, res: Response, next: NextFunction) {
  const ctx = Context.get(req)

  if (!ctx) {
    throw new HttpError("Something went wrong", 400)
  }

  const { userId } = req.params;

  if (!userId) {
    next();
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    }
  })

  if (!user) {
    next();
    return;
  }

  
  ctx.user = user;

  next()
}
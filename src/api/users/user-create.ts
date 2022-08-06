import { prisma, User } from "@prisma/client";
import { prismaClient } from "../clients/prisma";
import { HttpError } from "../errors/http-error";

type UserCreationParams = Omit<User, "id" | "createdAt" | "updatedAt">

export async function createUser(userCreationParams: UserCreationParams): Promise<User> {
  const existingUser = await prismaClient.user.findFirst({
    where: {
      email: userCreationParams.email
    }
  })

  if (existingUser) {
    throw new HttpError("A user with that email address already exists", 400)
  }

  const user = await prismaClient.user.create({
    data: userCreationParams,
  })

  return user;
}
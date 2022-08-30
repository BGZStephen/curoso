import { prismaClient } from "../clients/prisma";
import { HttpError, NotFoundError } from "../errors/http-error";
import { hashSync } from "bcryptjs";
import z from "zod";
import { Request, Response } from "express";
import { generateRequiredStringParams } from "../utils/zod";
import { Context } from "../middleware/context";

const userUpdateSchema = z.object({
  email: z.string(generateRequiredStringParams("Email")).email("Invalid email address").optional(),
  firstName: z.string(generateRequiredStringParams("First name")).optional(),
  lastName: z.string(generateRequiredStringParams("Last name")).optional(),
  password: z.string(generateRequiredStringParams("Password"))
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/, 
      "Password must contain 1 uppercase character, 1 lowercase character, 1 special character, 1 number and be over 8 characters in length"
    ).optional()
}, {
  invalid_type_error: "Unexpected body, expected an object containing email, firstName, lastName and password"
})

export async function updateUserHandler(req: Request, res: Response): Promise<void> {
  const userUpdateParams = userUpdateSchema.parse(req.body);

  const ctx = Context.get(req);

  if (!ctx.user) {
    throw new NotFoundError();
  }

  if (userUpdateParams.email && userUpdateParams.email ! === ctx.user.email) {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: userUpdateParams.email
      }
    })

    if (existingUser) {
      throw new HttpError("A user with that email address already exists", 400);
    }
  }

  if (userUpdateParams.password) {
    userUpdateParams.password = hashSync(userUpdateParams.password)
  }

  const user = await prismaClient.user.update({
    where: {
      id: ctx.user.id,
    },
    data: userUpdateParams,
  })

  res.json(user)
}
import { prismaClient } from "../clients/prisma";
import { HttpError } from "../errors/http-error";
import { hashSync } from "bcryptjs";
import z, { ZodErrorMap } from "zod";
import { Request, Response } from "express";

const userCreateSchema = z.object({
  email: z.string(generateRequiredStringParams("Email")).email("Invalid email address"),
  firstName: z.string(generateRequiredStringParams("First name")),
  lastName: z.string(generateRequiredStringParams("Last name")),
  password: z.string(generateRequiredStringParams("Password"))
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/, 
      "Password must contain 1 uppercase character, 1 lowercase character, 1 special character, 1 number and be over 8 characters in length"
    )
}, {
  invalid_type_error: "Unexpected body, expected an object containing email, firstName, lastName and password"
})

export async function createUserHAndler(req: Request, res: Response): Promise<void> {
  const userCreationParams = userCreateSchema.parse(req.body);

  const existingUser = await prismaClient.user.findFirst({
    where: {
      email: userCreationParams.email
    }
  })

  if (existingUser) {
    throw new HttpError("A user with that email address already exists", 400)
  }

  userCreationParams.password = hashSync(userCreationParams.password)

  const user = await prismaClient.user.create({
    data: userCreationParams,
  })

  res.json(user)
}

export function generateRequiredStringParams(field: string): {
  errorMap?: ZodErrorMap;
  invalid_type_error?: string;
  required_error?: string;
  description?: string;
} {
  return {
    invalid_type_error: `Expected ${field.toLocaleLowerCase()} to be a string`,
    required_error: `${field} is required`
  }
}
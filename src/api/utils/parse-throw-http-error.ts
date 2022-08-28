import { HttpError } from "../errors/http-error";

export function parseThrowHttpError<SchemaResponse>(schema: Zod.Schema, data: unknown): SchemaResponse {
  const parseResponse = schema.safeParse(data)

  if (parseResponse.success) {
    return parseResponse.data;
  }

  const errorString = parseResponse.error.issues.map(issue => issue.message).join(". ")

  throw new HttpError(errorString, 400);
}
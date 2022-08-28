import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-error";

export function httpErrorResponseHandler(
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send(err.message);
  }

  return res.status(500).send("Something went wrong");
}

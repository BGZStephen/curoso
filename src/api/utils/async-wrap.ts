import { NextFunction, Request, Response } from "express";

export function asyncwrap(fn: Function) {
  return function(req: Request, res: Response, next: NextFunction) {
    return fn.call(req, res, next).catch(next)
  }
}
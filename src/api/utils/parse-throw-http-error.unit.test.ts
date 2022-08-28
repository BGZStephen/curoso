import { z } from "zod";
import { HttpError } from "../errors/http-error";
import { parseThrowHttpError } from "./parse-throw-http-error";
import { generateRequiredStringParams } from "./zod";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("parse-throw-http-error", () => {
  describe("parseThrowHttpError", () => {
    test("Successful schema parse returns the data parsed", () => {
      const schema = z.object({})
      const data = {};

      expect(parseThrowHttpError<z.infer <typeof schema>>(schema, data)).toEqual({})
    })

    test("Failed schema parse throws a HttpError for a single error", () => {
      const schema = z.object({})
      const data = null;

      expect(() => parseThrowHttpError<z.infer <typeof schema>>(schema, data)).toThrow(new HttpError("Expected object, received null", 400))
    })

    test("Failed schema parse throws a HttpError for a single error", () => {
      const schema = z.object({
        firstName: z.string(generateRequiredStringParams("First name")),
        lastName: z.string(generateRequiredStringParams("Last name")),
      })
      
      const data = {};

      expect(() => parseThrowHttpError<z.infer <typeof schema>>(schema, data)).toThrow(new HttpError("First name is required. Last name is required", 400))
    })
  })
})
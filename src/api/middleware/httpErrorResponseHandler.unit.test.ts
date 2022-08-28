import { httpErrorResponseHandler } from "./httpErrorResponseHandler";
import { Request, Response } from "express";
import { HttpError } from "../errors/http-error";

jest.mock("../../common/utils/env");
jest.mock("@sentry/serverless", () => ({
  captureException: jest.fn(),
}));

beforeAll(() => {
  jest.clearAllMocks();
});

describe("http-error-response-handler", () => {
  describe("httpErrorResponseHandler", () => {
    test("When an HTTPError is sent, a response is sent with the custom error statusCode and message", () => {
      const resSendSpy = jest.fn();
      const resStatusSpy = jest.fn().mockReturnValue({
        send: resSendSpy,
      });

      const err = new HttpError("First name is required", 400);
      const req = {} as Request;
      const res = {
        status: resStatusSpy,
      } as any as Response;
      const next = jest.fn();

      httpErrorResponseHandler(err, req, res, next);

      expect(resStatusSpy).toHaveBeenCalledWith(400);
      expect(resSendSpy).toHaveBeenCalledWith("First name is required");
      expect(
        require("@sentry/serverless").captureException
      ).toHaveBeenCalledWith(err);
    });

    test("When an Error is sent, a response is sent with the 500 statusCode and a generic message", () => {
      const resSendSpy = jest.fn();
      const resStatusSpy = jest.fn().mockReturnValue({
        send: resSendSpy,
      });

      const err = new Error("First name is required");
      const req = {} as Request;
      const res = {
        status: resStatusSpy,
      } as any as Response;
      const next = jest.fn();

      httpErrorResponseHandler(err, req, res, next);

      expect(resStatusSpy).toHaveBeenCalledWith(500);
      expect(resSendSpy).toHaveBeenCalledWith("Something went wrong");
      expect(
        require("@sentry/serverless").captureException
      ).toHaveBeenCalledWith(err);
    });
  });
});

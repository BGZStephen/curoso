import { generateRequiredStringParams } from "./zod";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("zod", () => {
  describe("generateRequiredStringParams", () => {
    test("Returns a custom error message given a field name", () => {
      const field = "firstName";
      expect(generateRequiredStringParams(field)).toEqual({
        invalid_type_error: `Expected ${field.toLocaleLowerCase()} to be a string`,
        required_error: `${field} is required`
      })
    })
  })
})
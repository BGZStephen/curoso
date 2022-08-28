import { ZodErrorMap } from "zod";

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
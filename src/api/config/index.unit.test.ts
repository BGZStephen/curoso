jest.mock("../logger")
jest.mock("dotenv")

beforeEach(() => {
  jest.clearAllMocks();
})

describe("Config", () => {
  describe("validateEnvProvidedConfig", () => {
    beforeEach(() => {
      jest.resetModules()
    })

    test("Calls process.exit with a value of 1 if there are missing environment variables", () => {
      const { validateEnvProvidedConfig } = require(".")

      const process = global.process;

      global.process = {
        ...global.process,
        exit: jest.fn(),
        env: {}
      } as any as NodeJS.Process

      validateEnvProvidedConfig();

      expect(global.process.exit).toHaveBeenCalledWith(1)

      global.process = process;
    })

    test("Returns undefined when no missing variables are found", () => {
      const { validateEnvProvidedConfig } = require(".")

      const process = global.process;

      global.process = {
        exit: jest.fn(),
        env: {
          ENV: "dev",
          EXPRESS_PORT: "3000",
          SECRET: "secret",
          API_URL: "http://localhost:3000",
          POSTGRES_DATABASE: "postgres",
          POSTGRES_USER: "postgres",
          POSTGRES_PASSWORD: "postgres",
          POSTGRES_HOST: "localhost",
          POSTGRES_PORT: "5432"
        }
      } as any as NodeJS.Process

      const res = validateEnvProvidedConfig();

      expect(global.process.exit).not.toHaveBeenCalled();
      expect(res).toBe(undefined);

      global.process = process;
    })

    test("Returns default values ", () => {
      const { config } = require(".")

      expect(config).toEqual({
        ENV: "dev",
        EXPRESS_PORT: 3000,
        SECRET: "",
        API_URL: ""
      })
    })

    test("Returns default values ", () => {
      global.process.env = {
        ENV: "dev",
        EXPRESS_PORT: "3000",
        SECRET: "secret",
        API_URL: "url",
      }

      const { config } = require(".")

      expect(config).toEqual({
        ENV: "dev",
        EXPRESS_PORT: 3000,
        SECRET: "secret",
        API_URL: "url"
      })
    })
  })
})
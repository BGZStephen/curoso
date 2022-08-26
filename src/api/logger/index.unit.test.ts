import { logFormatter } from ".";

beforeEach(() => {
	jest.clearAllMocks();
})

describe("logger", () => {
	describe("logFormatter", () => {
		test("Given a set of parameters, returns a formatted string", () => {
			const meta = { key: "value" };
			const params = {
				timestamp: new Date().toISOString(),
				level: "info",
				message: "message",
				meta
			}

			const res = logFormatter(params)

			expect(res).toEqual(`${params.timestamp} [${params.level}]: ${params.message}, ${JSON.stringify(meta)}`)
		})
	})
})
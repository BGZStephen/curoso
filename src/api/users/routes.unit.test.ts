jest.mock("express", () => ({
  Router: jest.fn().mockReturnValue({
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  })
}))

beforeAll(() => {
  jest.clearAllMocks();
})

describe("routes", () => {
  test("Returns a router", () => {
    const { userRouter } = require("./routes")
  })
})
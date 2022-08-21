export default jest.fn().mockReturnValue({
  use: jest.fn(),
  listen: (port: number, callback: Function) => callback(),
})

export const Router = jest.fn().mockReturnValue({
  get: jest.fn(),
  put: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
})

export const json = jest.fn()
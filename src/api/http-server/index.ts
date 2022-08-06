import express, { json } from "express"
import cors from "cors"
import { config } from "../config";
import { logger } from "../logger";

export class AppHttpServerFactory {
	port = config.EXPRESS_PORT;

	start(): Promise<void> {
		return new Promise((resolve) => {
			const app = express();

			app.use(cors())
			app.use(json())

			app.listen(this.port, () => {
				logger.info(`HTTP Server started on port ${this.port}`)

				resolve()
			})
		})
	}
}

export const AppHttpServer = new AppHttpServerFactory()
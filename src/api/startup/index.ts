import { validateEnvProvidedConfig } from "../config";
import { AppHttpServer } from "../http-server";
import { logger } from "../logger";

export class AppStarter {
  static async startServices() {
    logger.info("Preparing environment variables")

    validateEnvProvidedConfig();

    logger.info("Starting services for application")

    await AppHttpServer.start();

    logger.info("All services started for application")
  }
}
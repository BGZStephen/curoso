import dotenv from "dotenv"
import { logger } from "../logger"

dotenv.config()

export interface Config {
	ENV: string;
	EXPRESS_PORT: number;
	SECRET: string;
	API_URL: string;
	DATABASE_URL: string;
}

export const config: Config = {
	ENV: process.env.ENV ?? "dev",
	EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT ?? "3000", 10),
	SECRET: process.env.SECRET ?? "",
	API_URL: process.env.API_URL ?? "",
	DATABASE_URL: process.env.DATABASE_URL ?? ""
}

export function validateEnvProvidedConfig(): void {
	const requiredConfigVariables = [
		"ENV",
		"EXPRESS_PORT",
		"SECRET",
		"API_URL",
		"DATABASE_URL"
	];

	const missingConfigVariables = [];

	for (const requiredConfigVariable of requiredConfigVariables) {
		if (!process.env[requiredConfigVariable]) {
			missingConfigVariables.push(requiredConfigVariable);
		}
	}

	if (missingConfigVariables.length !== 0) {
		logger.error("Missing environment variables in config");

		for (const missingConfigVariable of missingConfigVariables) {
			logger.error(`Missing variable: ${missingConfigVariable}`);
		}

		process.exit(1);
	}
}
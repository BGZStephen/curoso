import winston from "winston";

export function logFormatter(params: winston.Logform.TransformableInfo) {
	return `${params.timestamp} [${params.level}]: ${params.message}`
}

export function createLogger() {
	winston.addColors({
		error: "red",
		warn: "darkred",
		info: "cyan",
		debug: "gray"
	})

	return winston.createLogger({
		level: "info",
		format: winston.format.json(),
		defaultMeta: { service: "http-api" },
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.timestamp(),
					winston.format.splat(),
					winston.format.printf(logFormatter)
				)
			})
		]
	})
}

export const logger = createLogger()
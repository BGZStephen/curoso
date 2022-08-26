import winston from "winston";

export function logFormatter(params: winston.Logform.TransformableInfo) {
	const { timestamp, level, message, meta } = params;

	return `${timestamp} [${level}]: ${message}${meta ? ", " + JSON.stringify(meta): ""}`
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
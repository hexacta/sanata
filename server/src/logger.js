import logger from "winston";

//TODO read config from .env
//TODO add log file
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { level: "debug", colorize: true });

export default logger;

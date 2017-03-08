import dotenv from "dotenv";
import restify from "restify";
import logger from "./logger";
import sanata from "./sanata";

// Load env vars from .env
dotenv.config();

const server = restify.createServer();

server.get("/model/:username", async (req, res, next) => {
  const username = req.params.username;
  logger.verbose("GET " + req.url);
  const info = await sanata.getInfo(username);
  res.send(info);
  next();
});

server.listen(8080, () => {
  logger.info(`${server.name} listening at ${server.url}`);
});

process.on("unhandledRejection", r => logger.error(r));

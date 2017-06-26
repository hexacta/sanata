import dotenv from "dotenv";
import restify from "restify";
import logger from "./logger";
import sanata from "./sanata";

// Load env vars from .env
dotenv.config();

const server = restify.createServer();

server.get("/api/model/:username", async (req, res, next) => {
  const username = req.params.username;
  logger.verbose("GET " + req.url);
  const info = await sanata.getInfo(username);
  if (!info) {
    res.send(404);
  }
  res.send(info);
  next();
});

server.get("/api/ogdata/:url", async (req, res, next) => {
  const url = decodeURI(req.params.url);
  logger.verbose("GET " + req.url);
  logger.debug("Params " + url);
  const ogData = await sanata.scrapOgData(url);
  res.send(ogData);
  next();
});

server.listen(8080, () => {
  logger.info(`${server.name} listening at ${server.url}`);
});

process.on("unhandledRejection", r => logger.error(r));

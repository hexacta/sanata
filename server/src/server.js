import dotenv from "dotenv";
import restify from "restify";
import sanata from "./sanata";

// Load env vars from .env
dotenv.config();

const server = restify.createServer();

server.get("/model/:username", async (req, res, next) => {
  const username = req.params.username;
  console.log("get ", username);
  const info = await sanata.getInfo(username);
  res.send(info);
  next();
});

server.listen(8081, () => {
  console.log(`${server.name} listening at ${server.url}`);
});

import dotenv from "dotenv";
import twitter from "./twitter-assistant.js";
import db from "./database-assistant";
import trainer from "./trainer";
import restify from "restify";

function respond(req, res, next) {
  const username = req.params.username;
  console.log("get ", username);
  main(username).then(info => {
    res.send(info);
    next();
  });
}

// Load env vars from .env
dotenv.config();

const server = restify.createServer();

server.get("/model/:username", respond);
server.listen(8080, () => {
  console.log("%s listening at %s", server.name, server.url);
});

async function main(username) {
  const storedInfo = await db.getInfo(username);
  const oldModel = storedInfo.model;
  const lastProcessedTweetId = storedInfo.lastTweetId || 0;
  const newInfo = await twitter.getInfo(username, lastProcessedTweetId);
  const newTweets = newInfo.tweets;
  const lastTweetId = newInfo.lastTweetId;
  const newModel = await trainer.train(newTweets, oldModel);

  db.save(username, newModel, lastTweetId);

  // console.log(JSON.stringify(newModel, null, "\t"));

  return {
    username: username,
    fullname: newInfo.fullname,
    avatar: newInfo.avatar,
    model: newModel
  };
}

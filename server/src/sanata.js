import twitter from "./twitter-assistant.js";
import db from "./database-assistant";
import trainer from "./trainer";

/**
 * Get old info from database, get new info from twitter,
 * process new info, merge old with new, store it and return it.
 * @param {String} username 
 */
async function getInfo(username) {
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

export default {
  getInfo: getInfo
};

import logger from "winston";
import twitter from "./twitter-assistant.js";
import db from "./database-assistant";
import trainer from "./trainer";

/**
 * Get old info from database, get new info from twitter,
 * process new info, merge old with new, store it and return it.
 * @param {String} username 
 */
async function getInfo(username) {
  logger.verbose(`@${username} - Get info`);
  const storedInfo = await db.get(username);
  //TODO if it is from less than 24hs ago, return

  const info = storedInfo || { username };
  logger.verbose(`@${username} - Last update: ${info.lastUpdate}`);
  logger.verbose(`@${username} - Last tweet processed: ${info.lastTweetId}`);

  const newInfo = await twitter.getInfo(username, info.lastTweetId);
  if (!newInfo) {
    logger.verbose(`@${username} - No new tweets`);
  } else {
    const { tweets, lastTweetId, fullname, avatar } = newInfo;
    logger.verbose(`@${username} - ${tweets.length} new tweets`);

    const newModel = await trainer.train(tweets, info.model);

    info.model = newModel;
    info.lastTweetId = lastTweetId;
    info.fullname = fullname;
    info.avatar = avatar;

    logger.verbose(`@${username} - Last tweet processed: ${info.lastTweetId}`);
  }

  info.lastUpdate = new Date();
  db.save(info);

  // TODO don't return id, and maybe lastTweetId
  return info;
  // info = {
  //   model,
  //   username,
  //   lastTweetId,
  //   fullname,
  //   avatar,
  //   lastUpdate
  // }
}

export default {
  getInfo: getInfo
};

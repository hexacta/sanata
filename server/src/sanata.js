import twitter from "./twitter-assistant.js";
import db from "./database-assistant";
import trainer from "./trainer";

/**
 * Get old info from database, get new info from twitter,
 * process new info, merge old with new, store it and return it.
 * @param {String} username 
 */
async function getInfo(username) {
  const storedInfo = await db.get(username);
  //TODO if it is from less than 24hs ago, return

  const info = storedInfo || { username };
  const newInfo = await twitter.getInfo(username, info.lastTweetId);
  if (!newInfo) {
    console.log("No info from twitter");
  } else {
    const { tweets, lastTweetId, fullname, avatar } = newInfo;
    const newModel = await trainer.train(tweets, info.model);

    info.model = newModel;
    info.lastTweetId = lastTweetId;
    info.fullname = fullname;
    info.avatar = avatar;
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

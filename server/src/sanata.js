import logger from "winston";
import twitter from "./twitter-assistant.js";
import db from "./database-assistant";
import trainer from "./trainer";
import request from "request";
import ogs from "open-graph-scraper";

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

/**
 * Looks for the actual url behind a shortened URL
 * @param {String} url 
 */
async function resolveUrl(url) {
  return new Promise(function(resolve, reject) {
    var done = function(error, response) {
      if (error) {
        return reject(error, response);
      }
      return resolve(response.request.uri.href);
    };
    request(
      {
        method: "GET",
        url: url,
        followAllRedirects: true
      },
      done
    );
  }).catch(function(error) {
    // if (error) console.log("Resolve Url error: ", error);
    // there was a error passed back
  });
}

/**
 * Looks for Open Graph content in the url target
 * @param {String} url 
 */
async function scrapOgData(url) {
  var resolvedUrl = await resolveUrl(url);
  var options = { url: url };
  return ogs(options);
}

export default {
  getInfo: getInfo,
  scrapOgData: scrapOgData
};

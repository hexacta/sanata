import Twit from "twit";

// Maximum number of pages to fetch
const MAX_PAGES = 25;

/**
 * Fetch no more than 200 tweets, maybe less (limited by twitter api)
 * @param {Object} twitter 
 * @param {Object} options 
 * @returns {Promise<Array>} 
 */
async function getPage(twitter, options) {
  const opts = {
    count: 1000,
    trim_user: false,
    exclude_replies: true,
    include_rts: false,
    since_id: 1
  };
  Object.assign(opts, options);
  const response = await twitter.get("statuses/user_timeline", opts);
  return response.data.filter(t => t.id_str !== opts.max_id);
}

/**
 * Fetch user timeline tweets until:
 * 1. there are no more tweets, or
 * 2. lastTweetId is reached, or
 * 3. hit the limit of MAX_PAGES
 * @param {Object} twitter 
 * @param {String} username 
 * @param {String} lastTweetId 
 * @returns {Promise<Array>} array of tweets
 */
async function getAll(twitter, username, lastTweetId) {
  const opts = {
    screen_name: username,
    since_id: lastTweetId || "1"
  };

  let page = null;
  const pages = [];
  do {
    if (page) {
      opts.trim_user = true;
      opts.max_id = page[page.length - 1].id_str;
    }
    page = await getPage(twitter, opts);
    pages.push(page);
    // console.log(page.length);
  } while (page.length && pages.length < MAX_PAGES);

  const tweets = pages.reduce((a, b) => Array.concat(a, b), []);
  return tweets;
}

/**
 * Get tweets and user information posted after lastTweetId
 * @param {String} username 
 * @param {String} lastTweetId 
 * @returns {Promise<Object>}
 */
async function getInfo(username, lastTweetId) {
  const twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    app_only_auth: true
  });

  const tweets = await getAll(twitter, username, lastTweetId);

  if (!tweets.length) {
    return {
      any: false,
      tweets: [],
      lastTweetId: lastTweetId
    };
  }

  const lastTweet = tweets[0];
  const user = lastTweet.user;
  return {
    any: true,
    tweets: tweets.map(t => t.text),
    lastTweetId: lastTweet.id_str,
    fullname: user.name,
    avatar: user.profile_image_url
  };
}

export default {
  getInfo: getInfo
};

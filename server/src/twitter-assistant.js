import Twit from "twit";

export default {
  getInfo: async (username, lastTweetId) => {
    const twitter = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      app_only_auth: true
    });

    const options = {
      screen_name: username,
      count: 1000,
      trim_user: false,
      exclude_replies: true, //TODO include replies and RT and filter later
      include_rts: false,
      since_id: lastTweetId || "1"
      // max_id: "831997324146724864"
    };

    const response = await twitter.get("statuses/user_timeline", options);
    let tweets = response.data;
    // console.log(JSON.stringify(response, null, "\t"));

    if (!tweets.length) {
      return {
        any: false,
        tweets: [],
        lastTweetId: lastTweetId
      };
    }

    const lastTweet = tweets[0];
    const user = lastTweet.user;
    console.log(JSON.stringify(lastTweet, null, 2));

    let page = tweets;
    let loop = 30;
    while (page.length > 1 && loop) {
      loop -= 1;
      options.max_id = page[page.length - 1].id_str;
      const resp = await twitter.get("statuses/user_timeline", options);
      page = resp.data;
      page.pop();
      tweets = tweets.concat(page);
      console.log(page.length);
    }

    const texts = tweets.map(t => t.text);
    // console.log(JSON.stringify(texts, null, '\t'));

    return {
      any: true,
      tweets: texts,
      lastTweetId: lastTweet.id_str,
      fullname: user.name,
      avatar: user.profile_image_url
    };
  }
};

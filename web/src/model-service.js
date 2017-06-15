import markov from "hx-markov-chain";
import tokenizer from "hx-tokenizer";

function getInfo(username) {
  let timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 20000, "request timed out");
  });

  let fetch_wrapper = new Promise((resolve, reject) => {
    fetch(`api/model/${username}`)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });

  return Promise.race([timeout, fetch_wrapper])
    .then(response => response && response.ok ? response.json() : null)
    .catch(err => {
      console.log("Error fetching user: " + err);
      return null;
    });
}

function getTweet(info) {
  const chain = markov.run(info.model);
  return {
    avatar: info.avatar,
    username: info.username,
    fullname: info.fullname,
    text: tokenizer.join(chain),
    date: new Date().toLocaleDateString()
  };
}

export default {
  getInfo: getInfo,
  getTweet: getTweet
};

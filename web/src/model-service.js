import markov from "hx-markov-chain";
import tokenizer from "hx-tokenizer";

function getInfo(username) {
  return fetch(`api/model/${username}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
  });
}

function getOGData(url) {
  const encodedUrl = encodeURIComponent(url);
  return fetch(`api/ogdata/${encodedUrl}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
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
  getTweet: getTweet,
  getOGData: getOGData
};

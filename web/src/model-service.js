import markov from "hx-markov-chain";
import tokenizer from "hx-tokenizer";

function getInfo(username) {
  let timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 20000, "request timed out");
  });

  let fetchWrapper = new Promise((resolve, reject) => {
    fetch(`api/model/${username}`)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });

  return Promise.race([timeout, fetchWrapper])
    .then(response => response && response.ok ? response.json() : null)
    .catch(err => {
      console.log("Error fetching user: " + err);
      return null;
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
    text: decodeHtml(tokenizer.join(chain)),
    date: new Date().toLocaleDateString()
  };
}

const txt = document.createElement("textarea");

function decodeHtml(html) {
  txt.innerHTML = html;
  return txt.value;
}

export default {
  getInfo: getInfo,
  getTweet: getTweet,
  getOGData: getOGData
};

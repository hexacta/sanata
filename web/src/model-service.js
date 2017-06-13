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
  getTweet: getTweet
};

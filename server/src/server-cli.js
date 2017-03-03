import dotenv from "dotenv";
import markov from "hx-markov-chain";
import twitter from "./twitter-assistant.js";
import tokenizer from "hx-tokenizer";

async function main(username) {
  const info = await twitter.getInfo(username);

  const model = markov.create();
  info.tweets.forEach(tweet => {
    const tokens = tokenizer.tokenize(tweet);
    markov.update(model, tokens);
  });

  for (let i = 0; i < 10; i++) {
    const chain = markov.run(model);
    const text = tokenizer.join(chain);
    console.log(text);
  }
}

// Load env vars from .env
dotenv.config();
const username = process.argv[2];
if (!username) {
  throw new Error("Missing username arg");
}
main(username);

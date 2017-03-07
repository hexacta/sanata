import markov from "hx-markov-chain";
import tokenizer from "hx-tokenizer";

export default {
  train: (tweets, model) => {
    if (!model) {
      model = markov.create();
    }
    tweets.forEach(tweet => {
      const tokens = tokenizer.tokenize(tweet);
      markov.update(model, tokens);
    });
    return model;
  }
};

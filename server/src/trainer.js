import markov from "hx-markov-chain";
import tokenizer from "hx-tokenizer";

export default {
  emptyModel: () => {
    return markov.create();
  },
  train: (tweets, model) => {
    tweets.forEach(tweet => {
      const tokens = tokenizer.tokenize(tweet);
      markov.update(model, tokens);
    });
    return model;
  }
};

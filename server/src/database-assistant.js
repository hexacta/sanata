import trainer from "./trainer";

export default {
  getInfo: async username => {
    return {
      lastTweetId: null,
      model: trainer.emptyModel()
    };
  },

  save: async (usernamme, model, lastTweetId) => {
    return;
  }
};

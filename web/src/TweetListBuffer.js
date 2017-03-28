import React, { Component } from "react";
import TweetList from "./TweetList";

const DELAY = 120;

/**
 * Mount tweets one by one into a TweetList with a delay in between
 */
class TweetListBuffer extends Component {
  state = {
    mountedCount: 0
  };

  componentWillMount = () => {
    this.mountTweet();
  };

  componentWillReceiveProps = nextProps => {
    this.setState(prev => {
      return {
        mountedCount: Math.min(prev.mountedCount, nextProps.tweets.length)
      };
    });
    setTimeout(this.mountTweet, DELAY);
  };

  mountTweet = () => {
    if (this.state.mountedCount >= this.props.tweets.length) return;

    this.setState(prev => {
      return {
        mountedCount: prev.mountedCount + 1
      };
    });
    setTimeout(this.mountTweet, DELAY);
  };

  get mountedTweets() {
    return this.props.tweets.slice(0, this.state.mountedCount);
  }

  render = () => <TweetList tweets={this.mountedTweets} />;
}

export default TweetListBuffer;

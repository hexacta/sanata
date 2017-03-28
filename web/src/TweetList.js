import React, { Component } from "react";
import SingleMotion from "./SingleMotion";
import TweetContainer from "./TweetContainer";

class TweetList extends Component {
  state = {
    mountedTweets: [],
    unmountedTweets: []
  };

  render() {
    const { tweets } = this.props;
    if (!tweets || !tweets.length) return null;
    return (
      <div className="tweet-list">
        {tweets.map((tweet, i) => (
          <SingleMotion key={i} show>
            <TweetContainer tweet={tweet} />
          </SingleMotion>
        ))}
        <div style={{ height: "100px" }} />
      </div>
    );
  }
}

export default TweetList;

import React, { Component } from "react";
import TweetMotion from "./TweetMotion";
import Tweet from "./Tweet";

class TweetList extends Component {
  render() {
    const { tweets } = this.props;
    if (!tweets || !tweets.length) return null;
    return (
      <div className="tweet-list">
        {tweets.map((tweet, i) => (
          <TweetMotion key={i} show>
            <Tweet tweet={tweet} />
          </TweetMotion>
        ))}
        <div style={{ height: "100px" }} />
      </div>
    );
  }
}

export default TweetList;

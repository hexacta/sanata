import React, { Component } from "react";
import TweetContainer from "./TweetContainer";

class TweetList extends Component {
  render() {
    const { tweets } = this.props;
    return (
      <div>
        {tweets.map((tweet, i) => <TweetContainer key={i} tweet={tweet} />)}
      </div>
    );
  }
}

export default TweetList;

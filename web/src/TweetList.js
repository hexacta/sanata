import React, { Component } from "react";
import SingleMotion from "./SingleMotion";
import TweetContainer from "./TweetContainer";
import onScrollToBottom from "./scroller";

class TweetList extends Component {

  state = {
		mountedTweets: [],
		unmountedTweets: []
  };

  componentDidMount = () => {
    onScrollToBottom(this.props.loadMore);
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

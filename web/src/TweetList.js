import React, { Component } from "react";
import Tweet from "./Tweet";
import glamorous from "glamorous";

const TweetListContainer = glamorous.div({
  paddingTop: "15px",
  borderBottom: "1px solid #e1e8ed",
  minHeight: "100vh"
});

const Space = glamorous.div({
  height: "300px"
});

class TweetList extends Component {
  render() {
    const { tweets } = this.props;
    if (!tweets || !tweets.length) return null;
    return (
      <TweetListContainer>
        {tweets.map((tweet, i) => <Tweet key={i} tweet={tweet} />)}
        <Space />
      </TweetListContainer>
    );
  }
}

export default TweetList;

import React, { Component } from "react";
import EmbeddedMedia from "./EmbeddedMedia";
import glamorous from "glamorous";

const MainContainer = glamorous.div(
  {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    width: "80vw",
    maxWidth: "500px",
    minHeight: "50px",
    border: "1px solid #e1e8ed",
    borderBottom: "0",
    background: "white",
    padding: "9px 12px 12px 12px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "18px",

    willChange: "opacity, transform",
    transitionProperty: "opacity, transform",
    transitionDuration: "0.5s",
    transitionTimingFunction: "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
  },
  props => props.mounting && { opacity: "0", transform: "translateY(100%)" }
);

const TweetMain = glamorous.div({
  display: "flex",
  flexDirection: "row"
});

const TweetAvatar = glamorous.img({
  width: "48px",
  minWidth: "48px",
  height: "48px",
  borderRadius: "5px",
  marginRight: "10px"
});

const TweetBody = glamorous.div({});

const TweetHeader = glamorous.div({
  display: "flex",
  alignItems: "center",
  flexFlow: "row"
});

const TweetFullname = glamorous.strong({
  fontSize: "14px",
  fontWeight: "bold",
  color: "#14171a",
  display: "block",
  paddingRight: "5px"
});

const TweetUsername = glamorous.span({
  fontSize: "13px",
  color: "#657786"
});

const FakePrefix = glamorous.span({
  color: "#633"
});

const TweetText = glamorous.span({
  color: "#14171a",
  fontSize: "14px",
  whiteSpace: "normal",
  wordWrap: "break-word",
  margin: "0",
  padding: "0",
  listStyle: "none",
  border: "none"
});

const TweetMediaPreview = glamorous.div({
  width: "100%",
  paddingTop: "10px"
});

class Tweet extends Component {
  state = {
    mounting: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ mounting: false }), 50);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.mounting;
  }

  matchUrl = text => {
    var matches = text.match(/\bhttps?:\/\/\S+/gi);
    return matches ? matches[0] : null;
  };

  render() {
    const tweet = this.props.tweet;
    const mounting = this.state.mounting;
    return (
      <MainContainer mounting={mounting}>
        <TweetMain>
          <TweetAvatar src={tweet.avatar} alt="avatar" />
          <TweetBody>
            <TweetHeader>
              <TweetFullname>{tweet.fullname}</TweetFullname>
              <TweetUsername>
                <FakePrefix>@fake</FakePrefix>{tweet.username}
              </TweetUsername>
            </TweetHeader>
            <TweetText>{tweet.text}</TweetText>
            <TweetMediaPreview>
              <EmbeddedMedia targetUrl={this.matchUrl(tweet.text)} />
            </TweetMediaPreview>
          </TweetBody>
        </TweetMain>
      </MainContainer>
    );
  }
}

export default Tweet;

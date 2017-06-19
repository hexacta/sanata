import React, { Component } from "react";
import EmbeddedMedia from "./EmbeddedMedia";
import "./Tweet.css";

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
    const className = this.state.mounting
      ? "tweet-container entrance"
      : "tweet-container";
    return (
      <div className={className}>
        <div className="tweet-main">
          <img className="tweet-avatar" src={tweet.avatar} alt="avatar" />
          <div className="tweet">
            <div className="tweet-header">
              <strong className="tweet-fullname">{tweet.fullname}</strong>
              <span className="tweet-username">
                <span className="fake">@fake</span>{tweet.username}
              </span>
            </div>
            <span className="tweet-text">{tweet.text}</span>
          </div>

        </div>
        <div className="tweet-mediaPreview">
          <EmbeddedMedia targetUrl={this.matchUrl(tweet.text)} />
        </div>
      </div>
    );
  }
}

export default Tweet;

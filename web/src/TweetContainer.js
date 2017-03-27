import React, { Component } from "react";
import "./TweetContainer.css";

class TweetContainer extends Component {
  get containerStyle() {
    return {
      // minHeight: `${this.props.minHeight}vh`,
      opacity: this.props.motion,
      transform: `translateY(${100 - this.props.motion * 100}%)`
    };
  }
  render() {
    const tweet = this.props.tweet;
    if (!tweet) {
      return <div style={this.containerStyle} />;
    }
    return (
      <div style={this.containerStyle} className="tweet-container">
        <img className="tweet-avatar" src={tweet.avatar} alt="avatar" />
        <div className="tweet">
          <div className="tweet-header">
            <strong className="tweet-fullname">{tweet.fullname}</strong>
            <span className="tweet-username">@{tweet.username}</span>
          </div>
          <span className="tweet-text">{tweet.text}</span>
        </div>
      </div>
    );
  }
}

export default TweetContainer;

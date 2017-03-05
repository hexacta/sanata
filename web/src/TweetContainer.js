import React, { Component } from "react";
import ShuffleIcon from "./ShuffleIcon";
import "./TweetContainer.css";

class TweetContainer extends Component {
  get containerStyle() {
    return {
      minHeight: `${this.props.minHeight}vh`,
      opacity: this.props.opacity
    };
  }
  render() {
    const tweet = this.props.tweet;
    if (!tweet) {
      return <div style={this.containerStyle} />;
    }
    return (
      <div style={this.containerStyle} className="tweet-container">
        <div className="tweet">
          <div className="tweet-header">
            <img className="tweet-avatar" src={tweet.avatar} alt="avatar" />
            <div className="tweet-account">
              <strong className="tweet-fullname">{tweet.fullname}</strong>
              <span className="tweet-username">@{tweet.username}</span>
            </div>
            <span className="tweet-button" onClick={this.props.onChange}>
              <ShuffleIcon />
              {" Shuffle"}
            </span>
          </div>
          <span className="tweet-text">{tweet.text}</span>
        </div>
      </div>
    );
  }
}

export default TweetContainer;

import React, { Component } from "react";
import "./Tweet.css";

class Tweet extends Component {
  render() {
    const tweet = this.props.tweet;
    return (
      <div className="tweet-container">
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

export default Tweet;

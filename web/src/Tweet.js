import React, { Component } from "react";
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

  render() {
    const tweet = this.props.tweet;
    const className = this.state.mounting
      ? "tweet-container entrance"
      : "tweet-container";
    return (
      <div className={className}>
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
    );
  }
}

export default Tweet;

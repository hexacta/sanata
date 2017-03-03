import React, { Component } from "react";
import FormMotion from "./FormMotion";
import StatusBarMotion from "./StatusBarMotion";
import TweetContainerMotion from "./TweetContainerMotion";
import service from "./model-service";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      tweet: null,
      nextTweet: null
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.createNewTweet = this.createNewTweet.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.changeTweet = this.changeTweet.bind(this);
  }

  get isLoading() {
    return this.state.username && !this.state.tweet;
  }

  handleLoad(username) {
    this.setState({
      username: username,
      tweet: null,
      nextTweet: null
    });

    service.getInfo(username).then(this.setInfo);
  }

  createNewTweet() {
    this.setState({
      nextTweet: service.getTweet(this.state.info)
    });

    setTimeout(this.changeTweet, 500);
  }

  changeTweet() {
    this.setState(prev => {
      return {
        tweet: prev.nextTweet,
        nextTweet: null
      };
    });
  }

  setInfo(info) {
    this.setState({
      info: info,
      tweet: service.getTweet(info)
    });
  }

  render() {
    return (
      <div className="container">
        <FormMotion loading={this.isLoading} onChange={this.handleLoad} />
        <TweetContainerMotion
          tweet={this.state.tweet}
          changing={this.state.nextTweet}
          onChange={this.createNewTweet}
        />
        <StatusBarMotion
          loading={this.isLoading}
          username={this.state.username}
        />
      </div>
    );
  }
}

export default App;

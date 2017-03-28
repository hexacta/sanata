import React, { Component } from "react";
import FormMotion from "./FormMotion";
import VerticalPanelMotion from "./VerticalPanelMotion";
import StatusBar from "./StatusBar";
import LandingMessage from "./LandingMessage";
import TweetListBuffer from "./TweetListBuffer";
import service from "./model-service";
import onScrollToBottom from "./scroller";
import "./App.css";

class App extends Component {
  state = {
    username: null,
    info: null,
    tweets: []
  };

  get isLoading() {
    return this.state.username && !this.state.tweets.length;
  }

  componentDidMount = () => {
    onScrollToBottom(this.loadMore);
  };

  handleLoad = username => {
    this.setState({
      username: username,
      tweets: []
    });
    service.getInfo(username).then(this.load);
  };

  load = info => {
    const tweets = Array.from({ length: 10 }, () => service.getTweet(info));
    this.setState({
      info: info,
      tweets: tweets
    });
  };

  loadMore = () => {
    this.setState(prev => {
      if (!prev.info) return {};
      const tweet = service.getTweet(prev.info);
      return {
        tweets: prev.tweets.concat(tweet)
      };
    });
  };

  render() {
    return (
      <div className="container">
        <VerticalPanelMotion show={!this.state.username}>
          <LandingMessage />
        </VerticalPanelMotion>
        <FormMotion loading={this.isLoading} onChange={this.handleLoad} />
        <TweetListBuffer tweets={this.state.tweets} />
        <VerticalPanelMotion show={this.isLoading}>
          <StatusBar username={this.state.username} />
        </VerticalPanelMotion>
      </div>
    );
  }
}

export default App;

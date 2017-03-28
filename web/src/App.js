import React, { Component } from "react";
import FormMotion from "./FormMotion";
import VerticalPanelMotion from "./VerticalPanelMotion";
import StatusBar from "./StatusBar";
import LandingMessage from "./LandingMessage";
import TweetList from "./TweetList";
import service from "./model-service";
import onScrollToBottom from "./scroller";
import "./App.css";

class App extends Component {
  state = {
    username: null,
    info: null,
    tweets: [],
    newTweets: []
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
    const newTweets = Array.from({ length: 10 }, () => service.getTweet(info));
    this.setState({
      info: info,
      newTweets: newTweets
    });
    this.mountTweet();
  };

  mountTweet = () => {
    if (!this.state.newTweets.length) return;
    const newTweets = this.state.newTweets.slice();
    const tweets = this.state.tweets.concat(newTweets.pop());
    this.setState({
      tweets: tweets,
      newTweets: newTweets
    });
    setTimeout(this.mountTweet, 120);
  };

  loadMore = () => {
    if (!this.state.info) return;
    this.setState(ps => {
      const info = ps.info;
      const tweet = service.getTweet(info);
      return {
        newTweets: ps.newTweets.concat(tweet)
      };
    });
    this.mountTweet();
  };

  render() {
    return (
      <div className="container">
        <VerticalPanelMotion show={!this.state.username}>
          <LandingMessage />
        </VerticalPanelMotion>
        <FormMotion loading={this.isLoading} onChange={this.handleLoad} />
        <TweetList tweets={this.state.tweets} />
        <VerticalPanelMotion show={this.isLoading}>
          <StatusBar username={this.state.username} />
        </VerticalPanelMotion>
      </div>
    );
  }
}

export default App;

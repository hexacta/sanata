import React, { Component } from "react";
import FormMotion from "./FormMotion";
import HeightMotion from "./HeightMotion";
import StatusBar from "./StatusBar";
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
    if(this.props.match.params.username){
      this.handleUsername(this.props.match.params.username);
    }
  };

  handleLoad = username => {
    this.props.history.push(`/${username}`);
    this.handleUsername(username);
  };

  handleUsername = username => {
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
    const state = this.state;
    return (
      <div className="container">
        <HeightMotion show={!state.username} height={40} className="landing">
          Enter any twitter username to auto-generate fake tweets:
        </HeightMotion>
        <FormMotion loading={this.isLoading} onChange={this.handleLoad} />
        <TweetListBuffer tweets={state.tweets} />
        <HeightMotion show={!state.username} height={45} className="hil">
          An experiment from
          <br />
          <a href="https://showcase.hexacta.com/sanata">
            Hexacta Innovation Labs
          </a>
        </HeightMotion>
        <HeightMotion show={this.isLoading} height={30}>
          <StatusBar username={state.username} />
        </HeightMotion>
      </div>
    );
  }
}

export default App;

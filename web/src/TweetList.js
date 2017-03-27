import React, { Component } from "react";
import SingleMotion from "./SingleMotion";
import TweetContainer from "./TweetContainer";

class TweetList extends Component {
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = e => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		var bottom = doc.clientHeight + top;
		var remaining = doc.scrollHeight - bottom;

    if (remaining < 200) {
      this.props.loadMore();
    }
    // console.log(doc.scrollHeight - top, doc.clientHeight);
  };

  render() {
    const { tweets } = this.props;
		if (!tweets || !tweets.length) return null;
    return (
      <div style={{ minHeight: "100vh" }} ref={this.listDidMount}>
        {tweets.map((tweet, i) => (
          <SingleMotion key={i} show>
            <TweetContainer tweet={tweet} />
          </SingleMotion>
        ))}
				<div style={{ height: "300px" }}/>
      </div>
    );
  }
}

export default TweetList;

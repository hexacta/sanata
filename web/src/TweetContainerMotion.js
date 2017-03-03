import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import TweetContainer from "./TweetContainer";

class TweetContainerMotion extends Component {
  get motionStyle() {
    const tweet = this.props.tweet;
		const isChanging = this.props.changing;
    return {
      minHeight: spring(tweet ? 80 : 0),
      opacity: !tweet || isChanging? spring(0, {stiffness: 200}) : spring(1, {stiffness: 90})
    };
  }

  render() {
    return (
      <Motion style={this.motionStyle}>
        {snapshot => <TweetContainer {...this.props} {...snapshot} />}
      </Motion>
    );
  }
}

export default TweetContainerMotion;

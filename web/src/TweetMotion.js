import React, { Component } from "react";
import { Motion, spring } from "react-motion";

class TweetMotion extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.setState({ show: true });
  }

  get motionStyle() {
    return this.state.show
      ? {
          translate: spring(0),
          opacity: spring(1)
        }
      : {
          translate: spring(100),
          opacity: spring(0)
        };
  }

  getStyle = snapshot => {
    return {
      willChange: "transform, opacity",
      opacity: snapshot.opacity,
      transform: `translateY(${snapshot.translate}%)`
    };
  };

  render() {
    return (
      <Motion style={this.motionStyle}>
        {snapshot => (
          <div style={this.getStyle(snapshot)}>{this.props.children}</div>
        )}
        {/*{React.cloneElement(this.props.children, snapshot)}*/}
      </Motion>
    );
  }
}

export default TweetMotion;

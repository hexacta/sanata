import React, { Component } from "react";
import { Motion, spring } from "react-motion";

class HeightMotion extends Component {
  get motionStyle() {
    return this.props.show
      ? {
          height: spring(this.props.height),
          opacity: spring(1)
        }
      : {
          height: spring(0),
          opacity: spring(0)
        };
  }

  getStyle = snapshot => {
    return {
      height: `${snapshot.height}px`,
      opacity: snapshot.opacity
    };
  };

  render() {
    return (
      <Motion style={this.motionStyle}>
        {snapshot => (
          <div style={this.getStyle(snapshot)} className={this.props.className}>
            {this.props.children}
          </div>
        )}
      </Motion>
    );
  }
}

export default HeightMotion;

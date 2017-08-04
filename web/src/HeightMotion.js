import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import glamorous from "glamorous";

const Landing = glamorous.div(
  {
    color: "#555",
    textAlign: "center",
    maxWidth: "250px",
    overflow: "hidden"
  },
  props => props.bottom && { paddingTop: "20px", lineHeight: "1.3em" }
);

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
          <Landing style={this.getStyle(snapshot)} bottom={this.props.bottom}>
            {this.props.children}
          </Landing>
        )}
      </Motion>
    );
  }
}

export default HeightMotion;

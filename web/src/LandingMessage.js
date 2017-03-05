import React, { Component } from "react";

class LandingMessage extends Component {
  render() {
    const style = {
      opacity: this.props.motion,
      height: `${this.props.motion * 30}px`,
      color: "#555"
    };
    return (
      <div style={style}>
        Enter any twitter username:
      </div>
    );
  }
}

export default LandingMessage;

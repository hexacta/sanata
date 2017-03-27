import React, { Component } from "react";

class LandingMessage extends Component {
  render() {
    const style = {
      opacity: this.props.motion,
      height: `${this.props.motion * 40}px`,
      color: "#555",
      textAlign: "center",
      maxWidth: "250px",
      overflow: "hidden"
    };
    return (
      <div style={style}>
        Enter any twitter username to auto-generate fake tweets:
      </div>
    );
  }
}

export default LandingMessage;

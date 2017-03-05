import React, { Component } from "react";
import "./StatusBar.css";

class StatusBar extends Component {
  render() {
    const style = {
      opacity: this.props.motion,
      height: `${this.props.motion * 30}px`
    };
    return (
      <div style={style} className="status-bar">
        Generating model for @{this.props.username}...
      </div>
    );
  }
}

export default StatusBar;

import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import "./StatusBar.css";

function StatusBar(props) {
  const style = {
    opacity: props.opacity,
    height: `${props.height}px`
  };
  return (
    <div style={style} className="status-bar">
      Generating model for @{props.username}...
    </div>
  );
}

class StatusBarMotion extends Component {
  get motionStyle() {
    const loading = this.props.loading;
    return {
      opacity: spring(loading ? 1 : 0),
      height: spring(loading ? 30 : 0)
    };
  }

  render() {
    return (
      <Motion style={this.motionStyle}>
        {snapshot => <StatusBar {...this.props} {...snapshot} />}
      </Motion>
    );
  }
}

export default StatusBarMotion;

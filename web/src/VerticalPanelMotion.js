import React, { Component } from "react";
import { Motion, spring } from "react-motion";

class VerticalPanelMotion extends Component {
  get motionStyle() {
    return {
      motion: spring(this.props.show ? 1 : 0)
    };
  }

  render() {
    return (
      <Motion style={this.motionStyle}>
        {snapshot => React.cloneElement(this.props.children, snapshot)}
      </Motion>
    );
  }
}

export default VerticalPanelMotion;

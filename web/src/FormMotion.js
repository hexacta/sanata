import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import Form from "./Form";

class FormMotion extends Component {
  get motionStyle() {
    const loading = this.props.loading;
    return {
      height: spring(loading ? 70 : 32),
      width: spring(loading ? 70 : 250),
      radius: spring(loading ? 70 : 4),
      alpha: spring(loading ? 1 : 0)
    };
  }

  render() {
    return (
      <Motion style={this.motionStyle}>
        {snapshot => <Form {...this.props} {...snapshot} />}
      </Motion>
    );
  }
}

export default FormMotion;

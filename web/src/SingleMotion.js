import React, { Component } from "react";
import { Motion, spring } from "react-motion";

class SingleMotion extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    // this.setTimeout(() => this.setState({show: this.props.show}), 100);
    this.setState({
      show: this.props.show
    });
  }

  get motionStyle() {
    return {
      motion: spring(this.state.show ? 1 : 0)
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

export default SingleMotion;

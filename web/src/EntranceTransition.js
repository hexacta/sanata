import React, { Component } from "react";

class EntranceTransition extends Component {
  state = {
    mounting: true
  };

  componentDidMount() {
    requestAnimationFrame(() => this.setState({ mounting: false }));
  }

  render() {
    let className = this.props.className;
    className += this.state.mounting ? " entrance" : "";

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default EntranceTransition;

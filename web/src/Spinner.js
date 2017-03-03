import React, { Component } from "react";
import "./Spinner.css";

// From https://github.com/tobiasahlin/SpinKit
class Spinner extends Component {
  render() {
    return (
      <div className="spinner" style={this.props.style}>
        <div className="dot1" />
        <div className="dot2" />
      </div>
    );
  }
}

export default Spinner;

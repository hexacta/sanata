import React, { Component } from "react";
import { SpinnerContainer } from "./Style";

// From https://github.com/tobiasahlin/SpinKit
class Spinner extends Component {
  render() {
    return (
      <SpinnerContainer style={this.props.style} />
    );
  }
}

export default Spinner;

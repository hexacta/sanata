import React, { Component } from "react";
import { SpinnerContainer } from "./Style";

// From https://github.com/tobiasahlin/SpinKit
class Spinner extends Component {
  render() {
    return <SpinnerContainer {...this.props} />;
  }
}

export default Spinner;

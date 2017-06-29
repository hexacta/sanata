import React, { Component } from "react";
import { StatusBarContainer } from "./Style";

class StatusBar extends Component {
  render() {
    return (
      <StatusBarContainer>
        Generating model for @{this.props.username}...
      </StatusBarContainer>
    );
  }
}

export default StatusBar;

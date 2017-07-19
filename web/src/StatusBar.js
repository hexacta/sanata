import React, { Component } from "react";
import glamorous from "glamorous";

const StatusBarContainer = glamorous.div({
  color: "#555",
  paddingTop: "30px"
});

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

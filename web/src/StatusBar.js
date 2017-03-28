import React, { Component } from "react";

class StatusBar extends Component {
  render() {
    const style = {
      color: "#555",
      paddingTop: "30px"
    };
    return (
      <div style={style} className="status-bar">
        Generating model for @{this.props.username}...
      </div>
    );
  }
}

export default StatusBar;

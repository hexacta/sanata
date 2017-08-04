import React, { Component } from "react";
import glamorous from "glamorous";
import { css } from "glamor";

const skRotate = css.keyframes({
  "100%": { transform: `rotate(360deg)` }
});

const skBounce = css.keyframes({
  "0%": { transform: `scale(0.0)` },
  "100%": { transform: `scale(0.0)` },
  "50%": { transform: `scale(1.0)` }
});

const SpinnerContainer = glamorous.div({
  width: "40px",
  height: "40px",
  position: "relative",
  textAlign: "center",
  animation: `${skRotate} 2.0s infinite linear`
});

const Dot1 = glamorous.div({
  width: "60%",
  height: "60%",
  display: "inline-block",
  position: "absolute",
  top: "0",
  backgroundColor: "#fafafa",
  borderRadius: "100%",
  animation: `${skBounce} 2.0s infinite ease-in-out`
});

const Dot2 = glamorous(Dot1)({
  top: "auto",
  bottom: "0",
  animationDelay: "-1.0s"
});

// From https://github.com/tobiasahlin/SpinKit
class Spinner extends Component {
  get spinnerDynamicStyle() {
    return this.props.loading
      ? { opacity: this.props.alpha }
      : { display: "none" };
  }

  render() {
    return (
      <SpinnerContainer style={this.spinnerDynamicStyle}>
        <Dot1 />
        <Dot2 />
      </SpinnerContainer>
    );
  }
}

export default Spinner;

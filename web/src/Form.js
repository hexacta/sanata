import React, { Component } from "react";
import TextboxButton from "./TextboxButton";
import Spinner from "./Spinner";
import "./Form.css";

class Form extends Component {
  get inputStyle() {
    return this.props.loading ? { display: "none" } : {};
  }

  get spinnerStyle() {
    return this.props.loading
      ? { opacity: this.props.alpha }
      : { display: "none" };
  }

  get formStyle() {
    return {
      height: `${this.props.height}px`,
      width: `${this.props.width}px`,
      borderRadius: `${this.props.radius}px`,
      backgroundColor: `rgba(10,172,142,${this.props.alpha})`
    };
  }

  render() {
    return (
      <div className="form" style={this.formStyle}>
        <Spinner style={this.spinnerStyle} />
        <TextboxButton
          onSubmit={this.props.onChange}
          placeholder="username"
          prefix="@"
          style={this.inputStyle}
        />
      </div>
    );
  }
}

export default Form;

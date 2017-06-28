import React, { Component } from "react";
import TextboxButton from "./TextboxButton";
import Spinner from "./Spinner";
import { FormContainer } from "./Style";

class Form extends Component {
  get inputStyle() {
    return this.props.loading ? { display: "none" } : {};
  }

  get spinnerStyle() {
    return this.props.loading
      ? { opacity: this.props.alpha }
      : { display: "none" };
  }

  render() {
    return (
      <FormContainer {...this.props}>
        <Spinner style={this.spinnerStyle} />
        <TextboxButton
          onSubmit={this.props.onChange}
          placeholder="username"
          prefix="@"
          style={this.inputStyle}
        />
      </FormContainer>
    );
  }
}

export default Form;

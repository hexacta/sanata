import React, { Component } from "react";
import TextboxButton from "./TextboxButton";
import Spinner from "./Spinner";
import { FormContainer } from "./Style";

class Form extends Component {
  get inputStyle() {
    return this.props.loading ? { display: "none" } : {};
  }

  render() {
    return (
      <FormContainer {...this.props}>
        <Spinner {...this.props} />
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

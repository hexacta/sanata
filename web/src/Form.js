import React, { Component } from "react";
import TextboxButton from "./TextboxButton";
import Spinner from "./Spinner";
import { FormContainer } from "./Style";

class Form extends Component {

  render() {
    return (
      <FormContainer {...this.props}>
        <Spinner {...this.props} />
        <TextboxButton
          onSubmit={this.props.onChange}
          placeholder="username"
          prefix="@"
          {...this.props}
        />
      </FormContainer>
    );
  }
}

export default Form;

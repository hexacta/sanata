import React, { Component } from "react";
import TextboxButton from "./TextboxButton";
import Spinner from "./Spinner";
import { FormContainer } from "./Style";

class Form extends Component {

  render() {
    var { onChange, ...other } = this.props; //pass all props except OnChange
    return (
      <FormContainer {...other}>
        <Spinner {...this.props} />
        <TextboxButton
          onSubmit={this.props.onChange}
          placeholder="username"
          prefix="@"
          {...other}
        />
      </FormContainer>
    );
  }
}

export default Form;

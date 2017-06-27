import React, { Component } from "react";
import { FormInput, FormButton, FormSpan, FormWrapper} from "./Style"

class TextboxButton extends Component {
  constructor(props) {
    super(props);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = { value: "noah" };
  }

  handleSumbit(e) {
    this.props.onSubmit(this.state.value);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSumbit(e);
    }
  }

  render() {
    return (
      <FormWrapper style={this.props.style}>
        <FormSpan>{this.props.prefix}</FormSpan>
        <FormInput
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder={this.props.placeholder}
        />
        <FormButton onClick={this.handleSumbit}>Load</FormButton>
      </FormWrapper>
    );
  }
}

export default TextboxButton;

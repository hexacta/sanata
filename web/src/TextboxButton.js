import React, { Component } from "react";
import glamorous from "glamorous";

const FormInput = glamorous.input({
  flex: "1",
  border: "0",
  backgroundColor: "transparent",
  height: "85%",
  padding: "2px 2px 2px 2px",
  outline: "none"
});

const FormButton = glamorous.button({
  border: "0",
  backgroundColor: "transparent",
  height: "100%",
  cursor: "pointer",
  outline: "none"
});

const FormSpan = glamorous.span({
  color: "grey",
  marginLeft: "8px"
});

const FormWrapper = glamorous.div({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "white"
});

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

  get FormWrapperDynamicStyle() {
    return this.props.loading ? { display: "none" } : {};
  }

  render() {
    return (
      <FormWrapper style={this.FormWrapperDynamicStyle}>
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

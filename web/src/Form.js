import React, { Component } from "react";
import TextboxButton from "./TextboxButton";
import Spinner from "./Spinner";
import glamorous from "glamorous";

const FormContainer = glamorous.div({
  border: "1px solid rgba(10, 172, 142, 1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundColor: "white",
  marginTop: "15px"
});

class Form extends Component {
  get formDynamicStyle() {
    const { height, width, radius, alpha } = this.props;
    return {
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: `${radius}px`,
      backgroundColor: `rgba(10,172,142,${alpha})`
    };
  }

  render() {
    return (
      <FormContainer style={this.formDynamicStyle}>
        <Spinner loading={this.props.loading} />
        <TextboxButton
          onSubmit={this.props.onChange}
          placeholder="username"
          prefix="@"
          loading={this.props.loading}
        />
      </FormContainer>
    );
  }
}

export default Form;

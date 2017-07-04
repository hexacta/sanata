import React, { Component } from "react";
import TextboxButton from "./TextboxButton";
import Spinner from "./Spinner";
import glamorous from "glamorous";

const FormContainer = glamorous.div(
  {
    border: "1px solid rgba(10, 172, 142, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: "15px"
  },
  props => ({
    height: `${props.height}px`,
    width: `${props.width}px`,
    borderRadius: `${props.radius}px`,
    backgroundColor: `rgba(10,172,142,${props.alpha})`
  })
);

class Form extends Component {
  render() {
    return (
      <FormContainer
        height={this.props.height}
        width={this.props.width}
        radius={this.props.radius}
        alpha={this.props.alpha}
      >
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

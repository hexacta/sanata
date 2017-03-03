import React, { Component } from "react";

class TextboxButton extends Component {
  constructor(props) {
    super(props);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = { value: "jack" };
  }

  handleSumbit(e) {
    this.props.onSubmit(this.state.value);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSumbit(e);
    }    
  }

  render() {
    return (
      <div style={this.props.style} className="wrapper">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder={this.props.placeholder}
        />
        <button onClick={this.handleSumbit}>Load</button>
      </div>
    );
  }
}

export default TextboxButton;

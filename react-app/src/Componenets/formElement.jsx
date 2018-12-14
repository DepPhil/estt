import React, { Component } from "react";

class FormTextInput extends Component {
  state = {};
  render() {
    return (
      <div className="form-group">
        <label for={this.props.id}>{this.props.labelName}</label>
        <input
          onChange={this.props.onChange}
          value={this.props.value}
          type="text"
          className="form-control"
          id={this.props.id}
        />
      </div>
    );
  }
}

export default FormTextInput;

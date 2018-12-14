import React, { Component } from "react";
import FormTextInput from "./formElement";

class FormControl extends Component {
  state = { value: "" };
  handleTextChange = event => this.setState({ value: event.target.value });
  render() {
    return (
      <form>
        <FormTextInput
          onChange={this.handleTextChange}
          id="Name"
          labelName="Name"
          value={this.state.value}
        />
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default FormControl;

import React, { Component } from "react";
//import FormTextInput from "./formElement";

class AddPerson extends Component {
  state = { value: "" };
  handleTextChange = event => this.setState({ value: event.target.value });
  render() {
    return (
      <form>
        <div className="form-group">
          <label for="personName">Full Name</label>
          <input
            onChange={e => this.handleTextChange(e)}
            value={this.state.value}
            type="text"
            className="form-control"
            id="personName"
          />
        </div>
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

export default AddPerson;

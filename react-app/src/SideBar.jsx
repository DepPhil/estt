import React, { Component } from "react";
import $ from "jquery";
import { Person, Pop, HopEntry, Hop } from "./model/clientModel";

class SideBar extends Component {
  state = {
    buttonList: [],
    title: ""
  };
  componentDidMount = () => {
    $("#navBarDatabase").click(() => {
      this.Database();
    });
  };
  handleClick = (str, e) => {};
  Database = () => {
    console.log("Database Clicked");
    const buttonList = ["Persons", "Place of Postings", "Grades"];
    const title = "Database";
    this.setState({ buttonList, title });
  };
  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        {this.state.buttonList.map(str => (
          <button
            className="btn btn-link"
            key={str}
            onClick={e => this.props.handleChange({ name: "database", str }, e)}
          >
            {str}
          </button>
        ))}
      </div>
    );
  }
}

export default SideBar;

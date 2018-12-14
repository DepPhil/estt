import React, { Component } from "react";
import NavLink from "./nav-link";

class SideBar extends Component {
  state = {};
  navLinks = () =>
    this.props.sideBar.map(str => (
      <button
        className="btn btn-link"
        key={str}
        onClick={e => this.props.onChange(str, e)}
      >
        {str}
      </button>
    ));

  render() {
    return <nav className="nav flex-column">{this.navLinks()}</nav>;
  }
}

export default SideBar;

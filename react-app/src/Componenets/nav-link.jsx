import React, { Component } from "react";

class NavLink extends Component {
  state = {};

  render() {
    return (
      <a
        className="nav-link"
        href="#"
        onClick={e => this.props.handleClick(this.props.linkText, e)}
      >
        {this.props.linkText}
      </a>
    );
  }
}

export default NavLink;

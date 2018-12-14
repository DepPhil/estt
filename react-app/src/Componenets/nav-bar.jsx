import React, { Component } from "react";

class NavBar extends Component {
  state = {};

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3000">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button type="button" className="btn btn-link nav-link" href="#">
                Recruitment Rules
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-link nav-link"
                onClick={e => this.props.navBarClick("Personnel", e)}
              >
                Personnel
              </button>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                View
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <button
                  className="dropdown-item btn btn-link"
                  href="#"
                  onClick={e => this.props.navBarClick("Posts", e)}
                >
                  Posts
                </button>
                <a className="dropdown-item" href="#">
                  Personnel
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Offices
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.props.onEdit}>
                Edit
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;

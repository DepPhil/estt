import React, { Component } from "react";

class PersonSidebar extends Component {
  state = { post: "" };
  getPost = () => {
    return this.props.Post.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  changePost = e => {
    if (e.target.value == "All") this.props.filterPost("All");
    else {
      this.props.filterPost(
        this.props.Post.find(i => i._id == e.target.value).Name
      );
    }

    this.setState({ post: e.target.value });
  };

  render() {
    return (
      <div>
        <p className="h6">
          <u>Filter By</u>
        </p>

        <div className="form-check">
          <label htmlFor="promotionTo" className="col-form-label col-sm-4">
            <h6>Post</h6>
          </label>

          <select
            className="form-control"
            id="promotionTo"
            name="Promotion_To"
            value={this.state.post}
            onChange={this.changePost}
          >
            <option value="All">All</option>
            {this.getPost()}
          </select>
        </div>
      </div>
    );
  }
}

export default PersonSidebar;

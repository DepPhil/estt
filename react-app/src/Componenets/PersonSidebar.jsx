import React, { Component } from "react";

class PersonSidebar extends Component {
  state = { post: "", posting: "" };
  getPost = () => {
    return this.props.Post.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  getPosting = () => {
    const pops = this.props.Pop.filter(i => i.Level == 3);
    return pops.map(item => (
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
  changePosting = e => {
    if (e.target.value == "All") this.props.filterPosting("All");
    else {
      this.props.filterPosting(
        this.props.Pop.find(i => i._id == e.target.value).Name
      );
    }

    this.setState({ posting: e.target.value });
  };

  render() {
    return (
      <div>
        <p className="h6">
          <u>Filter By</u>
        </p>

        <div className="form-group row">
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
        <div className="form-group row">
          <label htmlFor="postingPlace" className="col-form-label col-sm-4">
            <h6>Place of Posting</h6>
          </label>

          <select
            className="form-control"
            id="postingPlace"
            name="Promotion_To"
            value={this.state.posting}
            onChange={this.changePosting}
          >
            <option value="All">All</option>
            {this.getPosting()}
          </select>
        </div>
      </div>
    );
  }
}

export default PersonSidebar;

import React, { Component } from "react";

class Person2Modal extends Component {
  state = { childPlace: [], parentPlace: "", Place_of_Posting: "" };
  place_of_posting = event => {
    const Place_of_Posting = event.target.value;
    this.setState({ Place_of_Posting });
  };
  handleChange = event => {
    console.log("the event value is: ", event.target.value);
    const parentId = event.target.value;
    console.log("the pops in Person Modal are: ", this.props.Pop);
    const childPlace = this.props.Pop.filter(i => {
      console.log(
        "the parent.office.id, and parentid",
        i.Parent_Office._id,
        parentId
      );

      return i.Parent_Office._id == parentId;
    });
    console.log("the child place is: ", childPlace);
    this.setState({ parentPlace: event.target.value, childPlace });
  };
  getPosts = () => {
    return this.props.Post.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  getPoP_parent = () => {
    console.log("pops in modal: ", this.props.Pop);
    const parentPop = this.props.Pop.filter(
      i => i.Parent_Office.Name === "Central Bureau of Narcotics"
    );
    return parentPop.map(parent => (
      <option key={parent._id} value={parent._id} id={parent._id}>
        {parent.Name}
      </option>
    ));
  };
  getPoP_child = () => {
    console.log("This.state.childPlace is: ", this.state.childPlace);
    return this.state.childPlace.map(child => (
      <option key={child._id} value={child._id} id={child._id}>
        {child.Name}
      </option>
    ));
  };
  historyPosting = () => {
    return <table />;
  };
  render() {
    return (
      <div>
        <hr />
        <div className="form-group">
          <label htmlFor="personnel-name" className="col-form-label col-sm-2">
            History of Posting
          </label>
          {this.historyPosting()}
          {/* <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="personnel-name"
              name="Name"
            />
          </div> */}
        </div>
        {/* <div className="form-group row">
          <label htmlFor="inlineRadio1" className="col-form-label col-sm-2">
            Sex
          </label>
          <div className="col-md-10">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Sex"
                id="inlineRadio1"
                value="Male"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Sex"
                id="inlineRadio2"
                value="Female"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Sex"
                id="inlineRadio3"
                value="Other"
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="personnel-dob" className="col-form-label col-sm-2">
            Date of Birth
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="personnel-dob"
              placeholder="dd/mm/yyyy"
              name="Date_of_Birth"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="personnel-post" className="col-form-label col-sm-4">
            Post
          </label>
          <div className="col-sm-8">
            <select className="form-control" id="personnel-post" name="Post">
              {this.getPosts()}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="personnel-pop" className="col-form-label col-sm-4">
            Place of Posting
          </label>
          <div className="col-sm-4">
            <select
              className="form-control"
              id="personnel-pop"
              value={this.state.parentPlace}
              onChange={this.handleChange}
            >
              <option />
              {this.getPoP_parent()}
            </select>
          </div>
          <div className="col-sm-4">
            <select
              className="form-control"
              id="personnel-pop2"
              name="Place_of_Post"
              value={this.state.Place_of_Posting}
              onChange={this.place_of_posting}
            >
              {this.getPoP_child()}
            </select>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Person2Modal;

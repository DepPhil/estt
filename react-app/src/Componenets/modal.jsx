import React, { Component } from "react";

class Modal extends Component {
  state = { childPlace: [], parentPlace: "" };
  handleChange = event => {
    console.log("the event value is: ", event.target.value);
    const parentId = event.target.value;
    const parent = this.props.pops.find(i => i._id === parentId);
    if (parent == null) return;
    const childPlace = parent.childOffice;
    this.setState({ parentPlace: event.target.value, childPlace: childPlace });
  };
  getPosts = () => {
    return this.props.posts.map(item => (
      <option key={item.title + "post"} value={item._id}>
        {item.title}
      </option>
    ));
  };
  getPoP_parent = () => {
    console.log("pops in modal: ", this.props.pops);
    return this.props.pops.map(parent => (
      <option key={parent._id} value={parent._id} id={parent._id}>
        {parent.title}
      </option>
    ));
  };
  getPoP_child = () => {
    return this.state.childPlace.map(child => (
      <option key={child._id} value={child._id} id={child._id}>
        {child.title}
      </option>
    ));
  };
  render() {
    return (
      <div
        className="modal fade"
        id="formModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add {this.props.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="personnelForm">
                <div className="form-group row">
                  <label
                    htmlFor="personnel-name"
                    className="col-form-label col-sm-2"
                  >
                    Full Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="personnel-name"
                      name="name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inlineRadio1"
                    className="col-form-label col-sm-2"
                  >
                    Sex
                  </label>
                  <div className="col-md-10">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        id="inlineRadio1"
                        value="male"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        id="inlineRadio2"
                        value="female"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Female
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        id="inlineRadio3"
                        value="other"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio3"
                      >
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="personnel-dob"
                    className="col-form-label col-sm-2"
                  >
                    Date of Birth
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="personnel-dob"
                      placeholder="dd/mm/yyyy"
                      name="date_of_birth"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="personnel-post"
                    className="col-form-label col-sm-4"
                  >
                    Post
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      id="personnel-post"
                      name="post"
                    >
                      {this.getPosts()}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="personnel-pop"
                    className="col-form-label col-sm-4"
                  >
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
                      name="place_of_post"
                    >
                      {this.getPoP_child()}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="personnel-doj"
                    className="col-form-label col-sm-2"
                  >
                    Date of Joining
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="personnel-doj"
                      placeholder="dd/mm/yyyy"
                      name="date_of_joining"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="closeModal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.submitForm}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

import React, { Component } from "react";
class EditPop extends Component {
  state = {};
  getParentOffice = () => {
    return this.props.Pop.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  render() {
    return (
      <div className="col-md-8">
        <form className="form" id="editPopForm">
          <div className="form-group row">
            <label htmlFor="personnel-name" className="col-form-label col-sm-4">
              Office Name
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="personnel-name"
                name="Name"
                defaultValue={
                  this.props.Pop.find(item => item._id == this.props.PopId).Name
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="personnel-post" className="col-form-label col-sm-4">
              Parent Office
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                id="personnel-post"
                name="Parent_Office"
                defaultValue={
                  this.props.Pop.find(item => item._id == this.props.PopId)
                    .Parent_Office._id
                }
              >
                {this.getParentOffice()}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="personnel-level"
              className="col-form-label col-sm-4"
            >
              Level
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="personnel-level"
                name="Level"
                defaultValue={
                  this.props.Pop.find(item => item._id == this.props.PopId)
                    .Level
                }
              />
            </div>
            <div className="form-group row">
              <input
                type="text"
                className="form-control"
                hidden
                name="PopId"
                defaultValue={
                  this.props.Pop.find(item => item._id == this.props.PopId)._id
                }
              />
            </div>
          </div>
        </form>
        <button
          onClick={this.props.editPopFormSubmit}
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    );
  }
}

export default EditPop;

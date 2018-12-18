import React, { Component } from "react";
import { Pop } from "../model/clientModel";
class PopModal extends Component {
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
      <div>
        <div className="modal-body">
          <form
            id="modalForm"
            action={this.props.ModalAction()}
            method="post"
            encType="multipart/form-data"
          >
            <div className="form-group row">
              <label
                htmlFor="personnel-name"
                className="col-form-label col-sm-2"
              >
                Office Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="personnel-name"
                  name={Pop.Name}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="personnel-post"
                className="col-form-label col-sm-4"
              >
                Parent Office
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="personnel-post"
                  name={Pop.Parent_Office}
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
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <input
                  type="text"
                  hidden
                  readOnly
                  className="form-control"
                  name="PopId"
                  value={this.props.PopId}
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
            id="modalFormSubmitBtn"
            onClick={e => this.props.submitForm(this.props.ModalAction, e)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default PopModal;

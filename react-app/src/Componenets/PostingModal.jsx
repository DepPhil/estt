import React, { Component } from "react";

class PostingModal extends Component {
  state = { poj: "", por: "", doj: "", dor: "" };
  submitForm = e => {
    this.resetState();
    this.props.submitForm(this.props.ModalAction, e);
  };
  resetState = () => {
    const state = { poj: "", por: "", doj: "", dor: "" };
    this.setState({ ...state });
  };
  getParentOffice = () => {
    const pop = this.props.Pop.filter(item => item.Level == 3);
    return pop.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  dorValue = () => {
    if (this.props.PostingId == "") return "";
    const val = this.props.Posting.find(i => i._id == this.props.PostingId);
    const date = new Date(val.Date_of_Relieving);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return day + "-" + month + "-" + year;
  };
  dojValue = () => {
    if (this.props.PostingId == "") return "";
    const val = this.props.Posting.find(i => i._id == this.props.PostingId);
    const date = new Date(val.Date_of_Joining);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return day + "-" + month + "-" + year;
  };
  pojValue = () => {
    if (this.props.PostingId == "") return "";
    const val = this.props.Posting.find(i => i._id == this.props.PostingId);
    return val.Place_of_Joining._id;
  };
  changePoj = e => this.setState({ poj: e.target.value });
  changePor = e => this.setState({ por: e.target.value });
  changeDoj = e => this.setState({ doj: e.target.value });
  changeDor = e => this.setState({ dor: e.target.value });
  componentDidMount = () => {};
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
                htmlFor="personnel-post"
                className="col-form-label col-sm-4"
              >
                Place of Joining
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="personnel-post"
                  name="Place_of_Joining"
                  //defaultValue={this.pojValue()}
                  value={
                    this.state.poj == "" ? this.pojValue() : this.state.poj
                  }
                  onChange={this.changePoj}
                >
                  {this.getParentOffice()}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="personnel-dor"
                className="col-form-label col-sm-4"
              >
                Date of Joining
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="personnel-dor"
                  name="Date_of_Joining"
                  //defaultValue={this.dojValue()}
                  value={
                    this.state.doj == "" ? this.dojValue() : this.state.doj
                  }
                  onChange={this.changeDoj}
                />
              </div>
            </div>
            {/* <div className="form-group row">
          <label htmlFor="personnel-poj" className="col-form-label col-sm-4">
            Place of Relieving
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              id="personnel-poj"
              name="Place_of_Relieving"
              value={this.state.por}
              onChange={this.changePor}
            >
              {this.getParentOffice()}
            </select>
          </div>
        </div> */}
            <div className="form-group row">
              <label
                htmlFor="personnel-doj"
                className="col-form-label col-sm-4"
              >
                Date of Relieving
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="personnel-doj"
                  name="Date_of_Relieving"
                  // defaultValue={this.dorValue()}
                  value={
                    this.state.dor == "" ? this.dorValue() : this.state.dor
                  }
                  onChange={this.changeDor}
                />
              </div>
            </div>
            <div className="form-group row">
              <input
                hidden
                name="PersonId"
                value={this.props.PersonId}
                readOnly
              />
            </div>
            <div className="form-group row">
              <input
                hidden
                name="PostingId"
                value={this.props.PostingId}
                readOnly
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            id="closeModal"
            onClick={this.resetState}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            id="modalFormSubmitBtn"
            onClick={e => this.submitForm(e)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default PostingModal;

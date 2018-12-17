import React, { Component } from "react";

class PostingModal extends Component {
  state = { poj: "", por: "", doj: "", dor: "" };
  getParentOffice = () => {
    const pop = this.props.Pop.filter(item => item.Level == 3);
    return pop.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  changePoj = e => this.setState({ poj: e.target.value });
  changePor = e => this.setState({ por: e.target.value });
  changeDoj = e => this.setState({ doj: e.target.value });
  changeDor = e => this.setState({ dor: e.target.value });
  componentDidMount = () => {};
  render() {
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="personnel-post" className="col-form-label col-sm-4">
            Place of Joining
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              id="personnel-post"
              name="Place_of_Joining"
              value={this.state.poj}
              onChange={this.changePoj}
            >
              {this.getParentOffice()}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="personnel-dor" className="col-form-label col-sm-4">
            Date of Joining
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="personnel-dor"
              name="Date_of_Joining"
              value={this.state.doj}
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
          <label htmlFor="personnel-doj" className="col-form-label col-sm-4">
            Date of Relieving
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="personnel-doj"
              name="Date_of_Relieving"
              value={this.state.dor}
              onChange={this.changeDor}
            />
          </div>
        </div>
        <div className="form-group row">
          <input hidden name="PersonId" defaultValue={this.props.PersonId} />
        </div>
        <div className="form-group row">
          <input hidden name="PostingId" defaultValue={this.props.PostingId} />
        </div>
      </div>
    );
  }
}

export default PostingModal;

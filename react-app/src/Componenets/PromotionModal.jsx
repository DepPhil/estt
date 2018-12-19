import React, { Component } from "react";

class PromotionModal extends Component {
  state = {
    promFrom: "",
    promTo: "",
    dop: "",
    doj: "",
    cat1: "",
    cat2: "",
    cat3: ""
  };
  resetState = () => {
    const state = {
      promFrom: "",
      promTo: "",
      dop: "",
      doj: "",
      cat1: "",
      cat2: "",
      cat3: ""
    };
    this.setState({ ...state });
  };
  submitForm = e => {
    this.props.submitForm(this.props.ModalAction, e);
  };
  promFromValue = () => {
    if (this.props.PromotionId == "") return "";
    return this.props.Promotion.find(i => i._id == this.props.PromotionId)
      .Promotion_From._id;
  };
  promToValue = () => {
    if (this.props.PromotionId == "") return "";
    return this.props.Promotion.find(i => i._id == this.props.PromotionId)
      .Promotion_To._id;
  };
  dopValue = () => {
    if (this.props.PromotionId == "") return "";
    const val = this.props.Promotion.find(i => i._id == this.props.PromotionId)
      .Date_of_Promotion;
    const date = new Date(val);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return day + "-" + month + "-" + year;
  };
  dojValue = () => {
    if (this.props.PromotionId == "") return "";
    const val = this.props.Promotion.find(i => i._id == this.props.PromotionId)
      .Date_of_Joining;
    const date = new Date(val);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return day + "-" + month + "-" + year;
  };
  cat1Value = () => {
    if (this.props.PromotionId == "") return "";
    return this.props.Promotion.find(i => i._id == this.props.PromotionId)
      .Category._id;
  };
  cat2Value = () => {
    if (this.props.PromotionId == "") return "";
    return this.props.Promotion.find(i => i._id == this.props.PromotionId)
      .Category_Selected._id;
  };
  cat3Value = () => {
    if (this.props.PromotionId == "") return "";
    return this.props.Promotion.find(i => i._id == this.props.PromotionId)
      .Category_Special._id;
  };
  changePromFrom = e => this.setState({ promFrom: e.target.value });
  changePromTo = e => this.setState({ promTo: e.target.value });
  changeDoP = e => this.setState({ dop: e.target.value });
  changeDoJ = e => this.setState({ doj: e.target.value });
  changeCat1 = e => this.setState({ cat1: e.target.value });
  changeCat2 = e => this.setState({ cat2: e.target.value });
  changeCat3 = e => this.setState({ cat3: e.target.value });
  getPost = () => {
    return this.props.Post.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  getCategory1 = () => {
    return this.props.Category1.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  getCategory2 = () => {
    return this.props.Category2.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  getCategory3 = () => {
    return this.props.Category3.map(item => (
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
                htmlFor="promotionFrom"
                className="col-form-label col-sm-4"
              >
                Promotion From
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="promotionFrom"
                  name="Promotion_From"
                  value={
                    this.state.promFrom == ""
                      ? this.promFromValue()
                      : this.state.promFrom
                  }
                  onChange={this.changePromFrom}
                >
                  {this.getPost()}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="promotionTo" className="col-form-label col-sm-4">
                Promotion To
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="promotionTo"
                  name="Promotion_To"
                  value={
                    this.state.promTo == ""
                      ? this.promToValue()
                      : this.state.promTo
                  }
                  onChange={this.changePromTo}
                >
                  {this.getPost()}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="personnel-dop"
                className="col-form-label col-sm-4"
              >
                Date of Promotion
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="personnel-dop"
                  name="Date_of_Promotion"
                  value={
                    this.state.dop == "" ? this.dopValue() : this.state.dop
                  }
                  onChange={this.changeDoP}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="personnel-pdoj"
                className="col-form-label col-sm-4"
              >
                Date of Joining
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="personnel-pdoj"
                  name="Date_of_Joining"
                  value={
                    this.state.doj == "" ? this.dojValue() : this.state.doj
                  }
                  onChange={this.changeDoJ}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="personnel-cat"
                className="col-form-label col-sm-4"
              >
                Category
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="personnel-cat"
                  name="Category"
                  value={
                    this.state.cat1 == "" ? this.cat1Value() : this.state.cat1
                  }
                  onChange={this.changeCat1}
                >
                  {this.getCategory1()}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="personnel-cats"
                className="col-form-label col-sm-4"
              >
                Category Selected
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="personnel-cats"
                  name="Category_Selected"
                  value={
                    this.state.cat2 == "" ? this.cat2Value() : this.state.cat2
                  }
                  onChange={this.changeCat2}
                >
                  >{this.getCategory2()}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="personnel-catsp"
                className="col-form-label col-sm-4"
              >
                Category Special
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="personnel-catsp"
                  name="Category_Special"
                  value={
                    this.state.cat3 == "" ? this.cat3Value() : this.state.cat3
                  }
                  onChange={this.changeCat3}
                >
                  >{this.getCategory3()}
                </select>
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
                name="PromotionId"
                value={this.props.PromotionId}
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

export default PromotionModal;

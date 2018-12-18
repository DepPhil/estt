import React, { Component } from "react";

class PromotionModal extends Component {
  state = {};
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
                >
                  {this.getCategory2()}
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
                >
                  {this.getCategory3()}
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

export default PromotionModal;

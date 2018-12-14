import React, { Component } from "react";

function PromotionModal(props) {
  const getPost = () => {
    return props.Post.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  const getCategory1 = () => {
    return props.Category1.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  const getCategory2 = () => {
    return props.Category2.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  const getCategory3 = () => {
    return props.Category3.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  return (
    <div>
      <div className="form-group row">
        <label htmlFor="promotionFrom" className="col-form-label col-sm-4">
          Promotion From
        </label>
        <div className="col-sm-8">
          <select
            className="form-control"
            id="promotionFrom"
            name="Promotion_From"
          >
            {getPost()}
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="promotionTo" className="col-form-label col-sm-4">
          Promotion To
        </label>
        <div className="col-sm-8">
          <select className="form-control" id="promotionTo" name="Promotion_To">
            {getPost()}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="personnel-dop" className="col-form-label col-sm-4">
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
        <label htmlFor="personnel-pdoj" className="col-form-label col-sm-4">
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
        <label htmlFor="personnel-cat" className="col-form-label col-sm-4">
          Category
        </label>
        <div className="col-sm-8">
          <select className="form-control" id="personnel-cat" name="Category">
            {getCategory1()}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="personnel-cats" className="col-form-label col-sm-4">
          Category Selected
        </label>
        <div className="col-sm-8">
          <select
            className="form-control"
            id="personnel-cats"
            name="Category_Selected"
          >
            {getCategory2()}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="personnel-catsp" className="col-form-label col-sm-4">
          Category Special
        </label>
        <div className="col-sm-8">
          <select
            className="form-control"
            id="personnel-catsp"
            name="Category_Special"
          >
            {getCategory3()}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <input hidden name="PersonId" value={props.PersonId} />
      </div>
      <div className="form-group row">
        <input hidden name="PromotionId" value={props.PromotionId} />
      </div>
    </div>
  );
}
export default PromotionModal;

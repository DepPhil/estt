import React, { Component } from "react";
import { Pop } from "../model/clientModel";
function PopModal(props) {
  const getParentOffice = () => {
    return props.data.map(item => (
      <option key={item._id} value={item._id}>
        {item.Name}
      </option>
    ));
  };
  return (
    <div>
      <div className="form-group row">
        <label htmlFor="personnel-name" className="col-form-label col-sm-2">
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
        <label htmlFor="personnel-post" className="col-form-label col-sm-4">
          Parent Office
        </label>
        <div className="col-sm-8">
          <select
            className="form-control"
            id="personnel-post"
            name={Pop.Parent_Office}
          >
            {getParentOffice()}
          </select>
        </div>
      </div>
    </div>
  );
}

export default PopModal;

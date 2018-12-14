import React, { Component } from "react";
//import { Pop } from "../model/clientModel";
function DocumentModal(props) {
  return (
    <div>
      <div className="form-group row">
        <label htmlFor="personnel-document" className="col-form-label col-sm-2">
          Document
        </label>
        <div className="col-sm-10">
          <input
            type="file"
            className="form-control-file"
            id="personnel-document"
            name="File"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="personnel-fn" className="col-form-label col-sm-2">
          File Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="personnel-fn"
            name="Name"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <input
            type="hidden"
            className="form-control"
            id="personnel-id"
            name="_id"
            value={props.data._id}
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentModal;

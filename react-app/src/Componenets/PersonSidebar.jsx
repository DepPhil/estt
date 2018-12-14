import React, { Component } from "react";

const PersonSidebar = props => {
  const handleChange = e => {
    console.log("The checkbox change is: ", e.target.value, e.target.name);
  };
  return (
    <div>
      <p className="h6">
        <u>Show</u>
      </p>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="defaultCheck1"
          name="Date_of_Birth"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlfor="defaultCheck1">
          Date of Birth
        </label>
      </div>
    </div>
  );
};
export default PersonSidebar;

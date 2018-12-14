import React, { Component } from "react";
//import logic from "../model/logic";
const logic = require("../model/logic");

class Table extends Component {
  state = {};
  tableHeadings = () => {
    // headings is an array of strings
    return this.props.headings.map(i => (
      <th key={i} scope="col" className={i === "_id" ? "hideColumn" : ""}>
        {i}
      </th>
    ));
  };
  tableData = () => {
    let rowNumber = 1;
    // data is an array of objects
    return this.props.data.map(row => (
      <tr key={rowNumber.toString() + "tr"}>
        <th scope="row" key={rowNumber.toString() + "th"}>
          {rowNumber++}
        </th>
        {Object.getOwnPropertyNames(row).map(i => (
          <td
            key={i.toString() + "td" + rowNumber.toString()}
            className={i === "_id" ? "hideColumn" : ""}
          >
            {i === "date_of_birth" || i === "date_of_joining"
              ? logic.convertDate(row[i])
              : row[i]}
          </td>
        ))}
        <td>
          <button className="btn btn-link">
            <i className="fas fa-edit" />
          </button>
        </td>
        <td>
          <button
            className="btn btn-link"
            onClick={e => this.props.deletePersonnel(row._id, e)}
          >
            <i className="fas fa-trash-alt" />
          </button>
        </td>
      </tr>
    ));
  };
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.No.</th>
              {this.tableHeadings()}
            </tr>
          </thead>
          <tbody>{this.tableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;

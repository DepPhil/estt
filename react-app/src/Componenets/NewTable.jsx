import React from "react";
//import logic from "../model/logic";
const logic = require("../model/logic");

// props needed data(array of object), title(string), editRow(fn), deleteRow(fn), hideColum(array of string)
function NewTable(props) {
  const tableHeadings = () => {
    // headings is an array of strings
    console.log("Inside table heading with data", props.data);
    if (props.data[0] == null) return;
    return Object.getOwnPropertyNames(props.data[0]).map(heading => (
      <th
        key={heading}
        scope="col"
        className={heading === "_id" ? "hideColumn" : ""}
      >
        {heading.replace(/_/g, " ")}
      </th>
    ));
  };
  const tableData = () => {
    let rowNumber = 1;
    // data is an array of objects
    return props.data.map(row => {
      return (
        <tr key={rowNumber.toString() + "tr"}>
          <th scope="row" key={rowNumber.toString() + "th"}>
            {rowNumber++}
          </th>
          {Object.getOwnPropertyNames(row).map(i => (
            <td
              key={i.toString() + "td" + rowNumber.toString()}
              name={i}
              className={i === "_id" ? "hideColumn" : ""}
            >
              {row[i]}
            </td>
          ))}
          <td>
            <button
              className="btn btn-link"
              onClick={e => props.showRow(props.title, row._id, e)}
            >
              <i className="fas fa-eye" />
            </button>
            <button
              className="btn btn-link"
              ddata-toggle="modal"
              data-target="myModal"
              onClick={e => props.editRow(props.title, row._id, e)}
            >
              <i className="fas fa-edit" />
            </button>
            <button
              className="btn btn-link"
              onClick={e => props.deleteRow(props.title, row._id, e)}
            >
              <i className="fas fa-trash-alt" />
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>S.No.</th>
            {tableHeadings()}
          </tr>
        </thead>
        <tbody>{tableData()}</tbody>
      </table>
      <button
        className="btn btn-secondary"
        data-toggle="modal"
        data-target={`#myModal`}
        id="showMyModal"
      >
        Add
      </button>
    </div>
  );
}

export default NewTable;

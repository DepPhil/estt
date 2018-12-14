import React, { Component } from "react";
//import FormControl from "./form";
import AddPerson from "./addPerson";
import AddPost from "./addPost";
import Table from "./table";
import Modal from "./modal";
import NewTable from "./NewTable";
import logic from "../model/logic";
import { Person, Pop, HopEntry, Hop } from "../model/clientModel";

class ContentPage extends Component {
  state = {
    tableHeadings: [],
    tableData: []
  };

  setDisplay = () => {
    switch (this.props.title) {
      case Pop.Pop:
        let data = Pop.setData(this.props[Pop.Pop]);
        return <NewTable title={this.props.title} data={data} />;

      default:
        break;
    }
    const currentDisplay = this.props.title;
    if (currentDisplay === "Add Person") {
      return <AddPerson />;
    } else if (currentDisplay === "Add Post") {
      return <AddPost />;
    } else if (currentDisplay === "Navigation Bar") {
    } else if (currentDisplay === "Posts") {
      let data = this.props.posts.map(row => [row.name]);
      return (
        <Table
          headings={["S.No", "Name", ""]}
          data={data}
          title={this.props.title}
          addItem={e => this.addItem(this.props.display, e)}
        />
      );
    } else if (currentDisplay === "Personnel") {
      console.log("personnel in content Page: ", this.props.personnel);
      let table = {
        headings: Object.keys(this.props.personnel[0]),
        data: this.props.personnel
      };
      return (
        <div>
          <Table {...table} deletePersonnel={this.props.deletePersonnel} />
          <button
            type="button"
            className="btn btn-secondary"
            data-toggle="modal"
            data-target="#formModal"
          >
            Add
          </button>
          <Modal title="Personnel" {...this.props} />
        </div>
      );
    } else return <div />;
  };
  render() {
    return this.setDisplay();
  }
  addItem = (title, e) => {
    if (title === "Personnel") {
      // render personnel form in a modal
    }
  };
}

export default ContentPage;

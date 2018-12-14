import React, { Component } from "react";
import NewTable from "./Componenets/NewTable";

class ContentPage extends Component {
  state = { title: "", data: [] };

  componentDidMount = () => {
    console.log("Content Page is rendered: ", this.props.data);
  };

  render() {
    return (
      <div>
        <NewTable {...this.props} />
      </div>
    );
  }
}

export default ContentPage;

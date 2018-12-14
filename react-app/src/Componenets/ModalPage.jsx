import React, { Component } from "react";
import PopModal from "./PopModal";
import { Person, Pop, HopEntry, Hop } from "../model/clientModel";

function ModalPage(props) {
  const drawModal = () => {
    if (props.title === Pop.Pop) {
      return <PopModal pop={props.data} />;
    }
  };
  return <div />;
}

export default ModalPage;

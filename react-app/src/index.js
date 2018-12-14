import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SideBar from "./SideBar";
import ContentPage from "./ContentPage";
import PopModal from "./Componenets/PopModal";
import * as serviceWorker from "./serviceWorker";
import { Person, Pop, HopEntry, Hop } from "./model/clientModel";
const data = require("./model/clientRequest");

// const state = {
//   sideBarChange: (obj, e) => {
//     if (obj.name === "database") {
//       console.log(`${obj.str} clicked`);
//       data.fetchAllPops(result => {
//         renderContentPage(Pop.setData(result));
//         renderModalPage(result, Pop.Pop);
//       });
//     }

//     if (obj.name === "modal") {
//       console.log(`${obj.str} clicked`);
//       data.fetchAllPops(result => {
//         renderModalPage(result, Pop.Pop);
//       });
//     }
//   }
// };
ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(
//   <SideBar handleChange={state.sideBarChange} />,
//   document.getElementById("sideBar")
// );

// function renderContentPage(data) {
//   ReactDOM.render(
//     <ContentPage handleChange={state.sideBarChange} data={data} />,
//     document.getElementById("contentPage")
//   );
// }
// function renderModalPage(data, title) {
//   ReactDOM.render(
//     <PopModal handleChange={state.sideBarChange} data={data} title={title} />,
//     document.getElementById("modalPage")
//   );
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

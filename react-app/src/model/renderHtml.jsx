import React, { Component } from "react";

export const SidebarList = props => {
  return props.data.map(item => {
    return (
      <a
        className="nav-link"
        href="#"
        key={item._id}
        onClick={e => props.sidebarClick(item, e)}
      >
        {item.Name}
      </a>
    );
  });
};

export default SidebarList;

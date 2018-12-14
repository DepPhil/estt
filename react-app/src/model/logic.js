//import React, { Component } from "react";

exports.convertFields = key => {
  let x = key.split("_");
  let y = x.map(i => {
    return i.toUpperCase();
  });
  let aString = "";
  y.forEach(i => (aString = aString + i + " "));
  return aString;
};

exports.convertDate = date => {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1; //month is between 0 and 11
  const day = _date.getDate();
  if (_date == "Invalid Date") return "";
  return `${day.toString()}/${month.toString()}/${year.toString()}`;
};
exports.validateDate = value => {
  let date = value.split(".");
  if (date.length !== 3) {
    date = value.split("/");
    if (date.length !== 3) {
      date = value.split("-");
      if (date.length !== 3) {
        return false;
      }
    }
  }
  if (date[2] < 25) date[2] = `20${date[2]}`;
  const finalDate = new Date(date[2], date[1] - 1, date[0], 12);
  console.log("final date is: ", finalDate);
  if (finalDate == "Invalid Date") return false; //Shallow check, deep check will not return true.
  return finalDate;
};

exports.hideColumn = (str, keys) => {
  if (keys == null || keys === [] || str == null || str === "") return;
  // Check if str is there in the keys, return hideColumn if true.
  const result = keys.find(i => str === i);
  if (!result) return ""; // if there str is there in the keys, the result will be positive and this will not get exectued.
  return "hideColumn";
};

exports.validateUser = (role, roles) => {
  const result = roles.indexOf(role);
  if (result == -1) return false;
  return true;
};

exports.setPerson = data => {
  let result = [];
  result = data.map(person => {
    return {
      _id: person._id,
      Name: person.Name,
      Post: person.Post,
      Place_of_Posting: person.Posting
    };
  });
  console.log("Data set for Person: ", result);
  return result;
};
exports.duration = (doj, dor) => {
  const milSec = new Date(dor) - new Date(doj);
  const days = milSec / (1000 * 60 * 60 * 24);
  return days.toString() + " Days";
};

exports.removeUnderlines = str => {
  return;
};

exports.sidebarButtons = list => {
  return;
};

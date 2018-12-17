const Person = {
  _id: "_id",
  Person: "Person",
  Name: "Name",
  Date_of_Birth: "Date_of_Birth",
  Sex: "Sex",
  setData: data => {
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
  }
};
const Pop = {
  Pop: "Pop",
  Name: "Name",
  Parent_Office: "Parent_Office",
  _id: "_id",
  setData: data => {
    const obj = data.map(function(item) {
      return {
        _id: item._id,
        [Pop.Name]: item.Name,
        Level: item.Level,
        "Parent Office": item.Parent_Office.Name
      };
    });
    return obj;
  }
};

const HopEntry = {
  _id: "_id",
  HopEntry: "HopEntry",
  Place_of_Relieving: "Place_of_Relieving",
  Place_of_Joining: "Place_of_Joining",
  Date_of_Relieving: "Date_of_Relieving",
  Date_of_Joining: "Date_of_Joining"
};

const Hop = {
  _id: "_id",
  Hop: "Hop",
  History_of_Posting: "History_of_Posting"
};

export { Person, Pop, HopEntry, Hop };

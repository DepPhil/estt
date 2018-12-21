const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(
  "mongodb://localhost:27017/establishment",
  { useNewUrlParser: true },
  function(err) {
    if (err) console.log(err);
    console.log("Connected to establishment database");
  }
);

const personSchema = new Schema({
  Name: {
    type: String,
    validate: {
      validator: str => !/[1-9<>$*/-=_+()&%#]/.test(str),
      message: "Name is not in correct format!"
    },
    required: "Name is required!"
  },
  Date_of_Birth: {
    type: Date,
    set: v => {
      if (v == "") return new Date("1900-01-01T00:00:00-00:00");
      return new Date(v);
    },
    default: new Date("1900-01-01T00:00:00-00:00")
  },
  Sex: {
    type: String,
    default: "Not Defined"
  },
  Post: {
    type: String,
    default: "Undefined"
  },
  Posting: {
    type: String,
    default: "Undefined"
  },
  Category: {
    type: String,
    default: "Undefined"
  },
  Category_Selected: {
    type: String,
    default: "Undefined"
  },
  Category_Special: {
    type: String,
    default: "Undefined"
  },
  Date_of_Record_creation: {
    type: Date,
    default: new Date()
  }
});
personSchema.pre("find", function() {
  this.sort({ Name: 1 });
});
const postingSchema = new Schema({
  PersonId: {
    type: Schema.Types.ObjectId,
    ref: "Person",
    required: true
  },
  Place_of_Relieving: {
    type: Schema.Types.ObjectId,
    ref: "Pop",
    default: "5c04ff58560ed9092cedc244" // corrosponds to 'Not Assigned'.
    //required: "Place of Relieving is required."
  },
  Place_of_Joining: {
    type: Schema.Types.ObjectId,
    ref: "Pop",
    default: "5c04ff58560ed9092cedc244"
    //required: "Place of Joining is required."
  },
  Date_of_Relieving: {
    type: Date,
    set: v => {
      if (v == "") return new Date("1900-01-01T00:00:00-00:00");
      return new Date(v);
    },
    default: new Date("1900-01-01T00:00:00-00:00")
  },
  Date_of_Joining: {
    type: Date,
    set: v => {
      if (v == "") return new Date("1900-01-01T00:00:00-00:00");
      return new Date(v);
    },
    default: new Date("1900-01-01T00:00:00-00:00")
  }
});
const hopSchema = new Schema({
  History_of_Posting: [{ type: Schema.Types.ObjectId, ref: "HopEntry" }]
});

const popSchema = new Schema({
  Name: {
    type: String,
    required: "Place name is required"
  },
  Parent_Office: {
    type: Schema.Types.ObjectId,
    ref: "Pop",
    default: "Not Assigned"
  },
  Level: Number
});

const postSchema = new Schema({
  Name: String
});

const promotionSchema = new Schema({
  PersonId: {
    type: Schema.Types.ObjectId,
    ref: "Person",
    required: true
  },
  Date_of_Promotion: {
    type: Date,
    set: v => {
      if (v == "") return new Date("1900-01-01T00:00:00-00:00");
      return new Date(v);
    },
    default: new Date("1900-01-01T00:00:00-00:00")
  },
  Date_of_Joining: {
    type: Date,
    set: v => {
      if (v == "") return new Date("1900-01-01T00:00:00-00:00");
      return new Date(v);
    },
    default: new Date("1900-01-01T00:00:00-00:00")
  },
  Promotion_From: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    default: "5c05070d94ff0c1df0c900c9"
  },
  Promotion_To: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    default: "5c05070d94ff0c1df0c900c9"
  },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category1",
    default: "5c0e14dd90776810cc8f98f2" //UR
  },
  Category_Selected: {
    type: Schema.Types.ObjectId,
    ref: "Category2",
    default: "5c0e14e8e0badb18c45e46f8" //UR
  },
  Category_Special: {
    type: Schema.Types.ObjectId,
    ref: "Category3",
    default: "5c0f95158bd30e12042ccabc" //None
  }
});

const sidebarListSchema = new Schema({
  Name: String,
  Parent: String
});

const documentSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Path: String,
  Parent: {
    type: Schema.Types.ObjectId,
    ref: "SidebarList",
    required: true
  }
});

examinationSchema = new Schema({
  Name: String,
  Description: String
});

category1Schema = new Schema({
  Name: String,
  Description: String
});
category2Schema = new Schema({
  Name: String,
  Description: String
});
category3Schema = new Schema({
  Name: String,
  Description: String
});
additionalDetailsSchema = new Schema({
  PersonId: {
    type: Schema.Types.ObjectId,
    ref: "Person"
  },
  Examination: {
    type: Schema.Types.ObjectId,
    ref: "Examination"
  },
  Rank: Number,
  Education_Qualification: String
});
userSchema = new Schema({
  UserId: String,
  Password: String,
  Role: [String]
});
// popSchema.add({
//   Parent_Office: {
//     type: Schema.Types.ObjectId,
//     ref: "Pop"
//   },
//   Subordinate_Offices: [{ type: Schema.Types.ObjectId, ref: "Pop" }]
// });
const Keys = callback => {
  const popKeys = Object.getOwnPropertyNames(popSchema.obj);
  const personKeys = Object.getOwnPropertyNames(personSchema.obj);
  const hopKeys = Object.getOwnPropertyNames(hopSchema.obj);
  const hopEntryKeys = Object.getOwnPropertyNames(hopEntrySchema.obj);

  callback({ popKeys, personKeys, hopKeys, hopEntryKeys });
};
const Person = mongoose.model("Person", personSchema);
const Pop = mongoose.model("Pop", popSchema);
const Posting = mongoose.model("Posting", postingSchema);
const Hop = mongoose.model("Hop", hopSchema);
const SidebarList = mongoose.model("SidebarList", sidebarListSchema);
const Document = mongoose.model("Document", documentSchema);
const Post = mongoose.model("Post", postSchema);
const Promotion = mongoose.model("Promotion", promotionSchema);
const Examination = mongoose.model("Examination", examinationSchema);
const Category1 = mongoose.model("Category1", category1Schema);
const Category2 = mongoose.model("Category2", category2Schema);
const Category3 = mongoose.model("Category3", category3Schema);
const User = mongoose.model("User", userSchema);
module.exports = {
  Person,
  Pop,
  Posting,
  Hop,
  Keys,
  SidebarList,
  Document,
  Post,
  Promotion,
  Examination,
  Category1,
  Category2,
  Category3,
  User
};

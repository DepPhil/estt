const {
  Person,
  Pop,
  HopEntry,
  Hop,
  Keys,
  SidebarList,
  Document,
  Post,
  Hopr,
  Promotion,
  Posting,
  Examination,
  Category1,
  Category2,
  Category3,
  User
} = require("./model");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const assert = require("assert");
const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
exports.allPops = callback => {
  Pop.find({})
    .populate("Parent_Office")
    .exec(function(err, res) {
      if (err) assert(err);
      console.log("Sending pops to the client. Pops count is: ", res.length);
      callback(res);
    });
};
exports.allPerson = callback => {
  Person.find({}).exec(function(err, res) {
    if (err) assert(err);
    console.log("Sending person to the client. Person count is: ", res.length);
    callback(res);
  });
};
exports.allData = callback => {
  const data = {
    Pop: [],
    Person: [],
    Post: [],
    Posting: [],
    SidebarList: [],
    Document: [],
    Examination: [],
    Category1: [],
    Category2: [],
    Category3: [],
    Promotion: []
  };
  Pop.find({})
    .populate("Parent_Office")
    .sort({ Level: 1 })
    .exec(function(err, res) {
      if (err) assert(err);
      console.log("The Pop result is row: ", res.length);
      data.Pop = res;
      SidebarList.find({}, (err, res) => {
        if (err) assert(err);
        console.log("The SidebarList result with row: ", res.length);
        data.SidebarList = res;
        Document.find({})
          .populate("Parent")
          .exec((err, res) => {
            if (err) assert(err);
            console.log("The Document result with row: ", res.length);
            data.Document = res;
            Person.find({}, (err, res) => {
              if (err) assert(err);
              data.Person = res;
              Post.find({}, (err, res) => {
                data.Post = res;
                Posting.find({})
                  .sort({ PersonId: 1, Date_of_Joining: -1 })
                  .populate("Place_of_Relieving")
                  .populate("Place_of_Joining")
                  .exec((err, res) => {
                    if (err) assert(err);
                    data.Posting = res;
                    Category1.find({}, (err, res) => {
                      data.Category1 = res;
                      Category2.find({}, (err, res) => {
                        data.Category2 = res;
                        Category3.find({}, (err, res) => {
                          data.Category3 = res;
                          Examination.find({}, (err, res) => {
                            data.Examination = res;
                            Promotion.find({})
                              .sort({ Date_of_Promotion: -1 })
                              .populate("Promotion_From")
                              .populate("Promotion_To")
                              .populate("Category")
                              .populate("Category_Selected")
                              .populate("Category_Special")
                              .exec((err, res) => {
                                data.Promotion = res;
                                callback(data);
                              });
                          });
                        });
                      });
                    });
                  });
              });
            });
          });
      });
    });
};
exports.addPop = (data, callback) => {
  if (data.PopId != "") {
    Pop.updateOne({ _id: data.PopId }, data, (err, res) => {
      Pop.find({})
        .sort({ Level: 1 })
        .populate("Parent_Office")
        .exec((err, res) => {
          callback(res);
        });
    });
  } else {
    Pop.create(data, (err, res) => {
      if (err) assert(err);
      console.log("added one pop in the database: ", res);
      Pop.find({})
        .sort({ Level: 1 })
        .populate("Parent_Office")
        .exec((err, res) => {
          callback(res);
        });
    });
  }
};

exports.addPerson = (data, callback) => {
  const { Name, Sex, Date_of_Birth, Promotion_To, Place_of_Joining } = data;
  //const Date_of_Birth = new Date(data.Date_of_Birth);
  Person.create({ Name, Sex, Date_of_Birth }, (err, res) => {
    if (err) assert(err);
    console.log("added one person in the database: ", res);
    const PersonId = res._id;
    // Promotion.create({ PersonId, Promotion_To }, (err, res) => {
    //   console.log("Promotion entry created: ", res);
    // });
    // Posting.create({ PersonId, Place_of_Joining }, (err, res) => {
    //   console.log("Posting entry created: ", res);
    // });
    Person.find({}, (err, res) => {
      callback(res);
    });
  });
};
exports.addDocument = (name, path, id, callback) => {
  Document.create({ Name: name, Path: path, Parent: id }, (err, res) => {
    if (err) assert(err);
    console.log("added one pop in the database: ", res);
    Document.find({}, (err, res) => {
      callback(res);
    });
  });
};
exports.updatePosting = (data, callback) => {
  let result = { Posting: [], Person: [] };
  if (data.PostingId == "") {
    //create new Posting document
    Posting.create(data, (err, res) => {
      if (err) assert(err);
      console.log("Created new Posting document: ", res);
      Posting.find({})
        .sort({ PersonId: 1, Date_of_Joining: -1 })
        .populate("Place_of_Relieving")
        .populate("Place_of_Joining")
        .exec((err, res) => {
          updatePersonPosting(data.PersonId, res, person => {
            result.Person = person;
            result.Posting = res;
            callback(result);
          });
        });
    });
  } else {
    Posting.updateOne({ _id: data.PostingId }, data, (err, res) => {
      if (err) assert(err);
      console.log("Updating Posting collection: ", res);
      Posting.find({})
        .sort({ PersonId: 1, Date_of_Joining: -1 })
        .populate("Place_of_Relieving")
        .populate("Place_of_Joining")
        .exec((err, res) => {
          updatePersonPosting(data.PersonId, res, person => {
            result.Person = person;
            result.Posting = res;
            callback(result);
          });
        });
    });
  }
};
exports.updatePromotion = (data, callback) => {
  let result = { Promotion: [], Person: [] };
  if (data.PromotionId == "") {
    //create new Posting document
    Promotion.create(data, (err, res) => {
      if (err) assert(err);
      console.log("Created new Promotion document: ", res);
      Promotion.find({})
        .sort({ Date_of_Promotion: -1 })
        .populate("Promotion_From")
        .populate("Promotion_To")
        .populate("Category")
        .populate("Category_Selected")
        .populate("Category_Special")
        .exec((err, res) => {
          updatePersonPost(data.PersonId, res, person => {
            result.Person = person;
            result.Promotion = res;
            callback(result);
          });
        });
    });
  } else {
    Promotion.updateOne({ _id: data.PromotionId }, data, (err, res) => {
      if (err) assert(err);
      console.log("Updating Promotion collection: ", res);
      Promotion.find({})
        .sort({ Date_of_Promotion: -1 })
        .populate("Promotion_From")
        .populate("Promotion_To")
        .populate("Category")
        .populate("Category_Selected")
        .populate("Category_Special")
        .exec((err, res) => {
          updatePersonPost(data.PersonId, res, person => {
            result.Person = person;
            result.Promotion = res;
            callback(result);
          });
        });
    });
  }
};
exports.deletePerson = (data, callback) => {
  Person.deleteOne({ _id: data.PersonId }, (err, res) => {
    console.log("Deleting one Person: ", res);
    Person.find({}).exec((err, res) => {
      callback(res);
    });
  });
};
exports.deletePop = (data, callback) => {
  Pop.deleteOne({ _id: data.PopId }, (err, res) => {
    console.log("Deleting one Pop: ", res);
    Pop.find({})
      .sort({ Level: 1 })
      .populate("Parent_Office")
      .exec((err, res) => {
        callback(res);
      });
  });
};
exports.deletePosting = (data, callback) => {
  let result = { Posting: [], Person: [] };
  Posting.deleteOne({ _id: data.PostingId }, (err, res) => {
    console.log("Deleting one Posting: ", res);
    Posting.find({})
      .sort({ PersonId: 1, Date_of_Joining: -1 })
      .populate("Place_of_Relieving")
      .populate("Place_of_Joining")
      .exec((err, res) => {
        updatePersonPosting(data.PersonId, res, person => {
          result.Person = person;
          result.Posting = res;
          callback(result);
        });
      });
  });
};
exports.deletePromotion = (data, callback) => {
  let result = { Promotion: [], Person: [] };
  Promotion.deleteOne({ _id: data.PromotionId }, (err, res) => {
    console.log("Deleting one Promotion: ", res);
    Promotion.find({})
      .sort({ Date_of_Promotion: -1 })
      .populate("Promotion_From")
      .populate("Promotion_To")
      .populate("Category")
      .populate("Category_Selected")
      .populate("Category_Special")
      .exec((err, res) => {
        updatePersonPost(data.PersonId, res, person => {
          result.Person = person;
          result.Promotion = res;
          callback(result);
        });
      });
  });
};
exports.logInUser = (data, callback) => {
  User.findOne({ UserId: data.UserId }, (err, res) => {
    if (res == null) callback(false);
    if (res.Password != data.Password) callback(false);
    callback({ UserId: res.UserId, Role: res.Role });
  });
};

function updatePersonPosting(PersonId, Posting, callback) {
  const posting = Posting.filter(item => item.PersonId == PersonId)[0];
  if (posting == null) {
    Person.find({}, (err, res) => {
      callback(res);
    });
  } else {
    const place = posting.Place_of_Joining.Name;
    console.log("Updating Person Posting to: ", place);
    Person.updateOne({ _id: PersonId }, { Posting: place }, (err, res) => {
      console.log("Person Posting updated: ", res);
      Person.find({}, (err, res) => {
        callback(res);
      });
    });
  }
}
function updatePersonPost(PersonId, Promotion, callback) {
  console.log("Updating person post with id: ", PersonId);
  const promotion = Promotion.filter(item => item.PersonId == PersonId)[0];
  if (promotion == null) {
    Person.find({}, (err, res) => {
      callback(res);
    });
  } else {
    const post = promotion.Promotion_To.Name;
    const category = promotion.Category.Name;
    const category_selected = promotion.Category_Selected.Name;
    const category_special = promotion.Category_Special.Name;
    console.log("Updating Person Post to: ", promotion);
    Person.updateOne(
      { _id: PersonId },
      {
        Post: post,
        Category: category,
        Category_Selected: category_selected,
        Category_Special: category_special
      },
      (err, res) => {
        console.log("Person Post updated: ", res);
        Person.find({}, (err, res) => {
          callback(res);
        });
      }
    );
  }
}
// User.insertMany([
//   { UserId: "Susheel", Password: "HOPSEAT", Role: ["HOP"] },
//   { UserId: "Admin", Password: "ADMIN", Role: ["ADMIN", "HOP"] }
// ]);
// var db;
// Pop.updateMany({}, { Level: 3 }, (err, res) => {
//   console.log("Pop updated with result: ", res);
// });
//Category3.create({ Name: "None" });
// Category3.insertMany([
//   { Name: "None" },
//   { Name: "EXS" },
//   { Name: "CA" },
//   { Name: "PWD-VH" },
//   { Name: "PWD-HH" },
//   { Name: "PWD-OH" },
//   { Name: "PWD-MD" }
// ]);
//Examination.insertMany([{ Name: "CGLE-2016" }, { Name: "CHSL-2016" }]);///
// Person.create({ Name: "Aman" }, (err, res) => {
//   console.log("A person created.");
// });
//SidebarList.create({ Name: "Place of Posting", Parent: "Database" });
//Pop.create({ Name: "Initial Posting" });
//HopEntry.create({});
//Post.create({ Name: "Not Assigned" });
// const id = new mongoose.Types.ObjectId("5c026e7e69ba36560f1f9db2");
// console.log("The Id is: ", id);
// SidebarList.create({ Name: "Recruitment Rules", Parent: "Documents" }, function(
//   err,
//   res
// ) {
//   if (err) assert(err);
//   console.log("Added sidebar list: ", res);
// });
// Pop.create(
//   {
//     Name: "Not Assigned"
//   },
//   function(err, res) {
//     if (err) assert(err);
//     console.log("Added Pop: ", res);
//   }
// );

// mongoose.connect(
//   "mongodb://localhost:27017/establishment",
//   { useNewUrlParser: true },
//   function(err) {
//     if (err) console.log(err);
//     const demoSchema = new Schema({
//       title: {
//         type: String,
//         validate: { validator: str => !/[1-9<>$*/-=_+()&%#]/.test(str) }
//       },
//       date_of_birth: Date,
//       job: String
//     });
//     const Demo = mongoose.model("Demo", demoSchema);
//     Demo.create(
//       { title: "Aman3", date_of_birth: new Date(), job: "Clerk" },
//       function(err, result) {
//         if (err) assert(err);
//         console.log("the result is: ", result);
//       }
//     );
//   }
// );

// exports.connectDb = function() {
//   // Connection URL
//   const url = "mongodb://localhost:27017";
//   // Database Name
//   const dbName = "establishment";
//   // Create a new MongoClient
//   const client = new MongoClient(url, { useNewUrlParser: true });
//   // Use connect method to connect to the Server
//   client.connect(function(err) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     db = client.db(dbName);
//     return db;
//   });
// };
// exports.navigationBar = function(callback) {
//   // Get the documents collection
//   const collection = db.collection("navigationBar");
//   // Find some documents
//   collection
//     .find({})
//     .sort({ order: 1 }) // 1 is ascending order and -1 is descending.
//     .toArray(function(err, docs) {
//       assert.equal(err, null);
//       console.log("Found the following number of records: ", docs.length);
//       callback(docs);
//     });
// };
// exports.allPosts = function(callback) {
//   // Get the documents collection
//   const collection = db.collection("posts");
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following number of records: ", docs.length);
//     callback(docs);
//   });
// };

// exports.allPersonnel = function(callback) {
//   // Get the documents collection
//   let result = { personnel: [], posts: [], placeOfPosting: [] };
//   const collection = db.collection("personnel");
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Total personnel are:  ", docs.length);
//     result.personnel = docs;
//     const postsCollection = db.collection("posts");
//     postsCollection
//       .find({})
//       .sort({ order: 1 })
//       .toArray(function(err, docs) {
//         assert.equal(err, null);
//         console.log("Total posts are:  ", docs.length);
//         result.posts = docs;
//         const popCollection = db.collection("placeOfPosting");
//         popCollection.find({}).toArray(function(err, docs) {
//           assert.equal(err, null);
//           console.log("Total pops are:  ", docs.length);
//           result.placeOfPosting = docs;
//           callback(result);
//         });
//       });
//   });
// };
// exports.addPersonnel = (data, callback) => {
//   let result = { personnel: [], posts: [], placeOfPosting: [] };
//   const collection = db.collection("personnel");
//   collection.insertOne(data, (err, rlt) => {
//     assert.equal(err, null);
//     assert.equal(1, rlt.insertedCount);
//     collection.find({}).toArray(function(err, docs) {
//       assert.equal(err, null);
//       console.log("Total personnel are:  ", docs.length);
//       result.personnel = docs;
//       const postsCollection = db.collection("posts");
//       postsCollection
//         .find({})
//         .sort({ order: 1 })
//         .toArray(function(err, docs) {
//           assert.equal(err, null);
//           console.log("Total posts are:  ", docs.length);
//           result.posts = docs;
//           const popCollection = db.collection("placeOfPosting");
//           popCollection.find({}).toArray(function(err, docs) {
//             assert.equal(err, null);
//             console.log("Total pops are:  ", docs.length);
//             result.placeOfPosting = docs;
//             callback(result);
//           });
//         });
//     });
//   });
// };
// exports.deletePersonnel = (req, callback) => {
//   let rlt = { personnel: [] };
//   console.log("deleting collection with id", req.id);
//   const collection = db.collection("personnel");
//   const id = new ObjectId(req.id);
//   collection.deleteOne({ _id: id }, (err, result) => {
//     assert.equal(err, null);
//     assert.equal(1, result.deletedCount);

//     collection.find({}).toArray(function(err, docs) {
//       assert.equal(err, null);
//       console.log("Total personnel are:  ", docs.length);
//       rlt.personnel = docs;
//       callback(rlt);
//     });
//   });
// };

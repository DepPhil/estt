const debug = require("debug")("server");
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
debug("server is initilising");
const data = require("./data/data");
app.use(express.static(path.join(__dirname, 'build')));
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function(req, file, cb) {
    const extn = path.extname(file.originalname);
    if (extn == "") return;
    const fname = `File-${Date.now()}${extn}`;
    cb(null, fname);
  }
});

var upload = multer({ storage: storage });
//data.connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.get("/navBar", cors(), function(req, res) {
  console.log("request from client!");
  data.navigationBar(result => {
    console.log("sending navBar to the client");
    res.status(200).send(result);
  });
});

app.get("/allPosts", cors(), function(req, res) {
  data.allPosts(result => {
    console.log("sending all Posts to the client");
    res.status(200).send(result);
  });
});

app.get("/allPops", cors(), function(req, res) {
  data.allPops(result => {
    if (result == null) res.send([]);
    console.log("sending all Pops to the client");
    res.status(200).send(result);
  });
});

app.get("/allPersonnel", cors(), function(req, res) {
  data.allPersonnel(result => {
    console.log("sending all Personnel to the client");
    res.status(200).send(result);
  });
});
app.get("/allData", cors(), function(req, res) {
  data.allData(result => {
    console.log("sending all data to the client");
    res.status(200).send(result);
  });
});

app.post("/addPersonnel", cors(), function(req, res) {
  console.log("the post request is: ", req.body);
  data.addPersonnel(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/addPop", cors(), function(req, res) {
  console.log("the post request is: ", req.body);
  data.addPop(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/addPerson", cors(), function(req, res) {
  console.log("the person request is: ", req.body);
  data.addPerson(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/updatePosting", cors(), function(req, res) {
  console.log("the update posting request is: ", req.body);
  data.updatePosting(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/updatePromotion", cors(), function(req, res) {
  console.log("the update promotion request is: ", req.body);
  data.updatePromotion(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/deletePerson", cors(), function(req, res) {
  console.log("the delete request for Person is: ", req.body);
  data.deletePerson(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/deletePosting", cors(), function(req, res) {
  console.log("the delete request is: ", req.body);
  data.deletePosting(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/deletePromotion", cors(), function(req, res) {
  console.log("the delete request is: ", req.body);
  data.deletePromotion(req.body, result => {
    res.status(200).send(result);
  });
});
app.post("/UploadDocument", cors(), upload.single("File"), function(req, res) {
  data.addDocument(req.body.Name, req.file.path, req.body._id, result => {
    res.send("File Uploaded");
  });

  // data.deletePersonnel(req.body, result => {
  //   res.status(200).send(result);
  // });
});
app.get("/getDocument", cors(), function(req, res) {
  console.log("The get req for document is: ", req.query);
  res.sendFile(req.query.Path);
});
app.post("/logInUser", cors(), function(req, res) {
  console.log("the login request is: ", req.body);
  data.logInUser(req.body, result => {
    res.status(200).send(result);
  });
});

app.listen(9000, () => console.log("Listening on port 9000..."));

const $ = require("jquery");
const ipAddress = "http://192.168.1.22:9000";
exports.demo = () => {
  const result = $.get("http://192.168.1.22:9000/navBar", data => {
    console.log("get request data is: ", data);
    return data;
  });
};
exports.fetchAllPosts = callback => {
  $.get(`${ipAddress}/allPosts`, data => {
    console.log("got all the posts ", data);
    callback(data);
  });
};
exports.fetchAllPersonnel = callback => {
  $.get(`${ipAddress}/allPersonnel`, data => {
    console.log("got all the personnel ", data);
    callback(data);
  });
};
exports.addPersonnel = (req, callback) => {
  $.post(`${ipAddress}/addPersonnel`, req, result => {
    callback(result);
  });
};
exports.addPop = (req, callback) => {
  $.post(`${ipAddress}/addPop`, req, result => {
    callback(result);
  });
};
exports.addPerson = (req, callback) => {
  $.post(`${ipAddress}/addPerson`, req, result => {
    callback(result);
  });
};
exports.updatePosting = (req, callback) => {
  $.post(`${ipAddress}/updatePosting`, req, result => {
    callback(result);
  });
};
exports.updatePromotion = (req, callback) => {
  $.post(`${ipAddress}/updatePromotion`, req, result => {
    callback(result);
  });
};
exports.deletePerson = (PersonId, callback) => {
  $.post(`${ipAddress}/deletePerson`, { PersonId }, result => {
    callback(result);
  });
};
exports.deletePosting = (PostingId, PersonId, callback) => {
  $.post(`${ipAddress}/deletePosting`, { PostingId, PersonId }, result => {
    callback(result);
  });
};
exports.deletePromotion = (PromotionId, PersonId, callback) => {
  $.post(`${ipAddress}/deletePromotion`, { PromotionId, PersonId }, result => {
    callback(result);
  });
};
exports.fetchAllPops = callback => {
  $.get(`${ipAddress}/allPops`, data => {
    console.log("got all the pops: ", data);
    callback(data);
  });
};
exports.setState = callback => {
  $.get(`${ipAddress}/allData`, data => {
    console.log("got all the Data: ", data);
    callback(data);
  });
};
exports.logInUser = (req, callback) => {
  $.post(`${ipAddress}/logInUser`, req, result => {
    callback(result);
  });
};

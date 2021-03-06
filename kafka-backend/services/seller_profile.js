const Seller = require('../models/sellerModel');
var mysql = require("../models/mysql");


exports.serve = function serve(msg, callback) {
  console.log("msg", msg);
  // console.log("In Service path:", msg.path);
  switch (msg.path) {
    case "fetchprofile_seller":
      fetchprofile_seller(msg.body, callback);
      break;
    case "namepic_func":
      namepic_func_seller(msg.body, callback);
      break;
    case "address_func":
      address_func_seller(msg.body, callback);
      break;
    case "all_sellers":
      all_sellers(msg.body, callback);
      break;
  }
}

function fetchprofile_seller(msg, callback) {
  var res = {};

  Seller.findOne({ "user.email": msg.email },
    function (err, docs) {
      if (err) {
        console.log("Inside if : error", err);
        res.code = "400";
        res.value = "No user found";
        //res.sendStatus(400).end("No user found");
        callback(null, res.value);
      }
      else {
        console.log("Inside else : ");
        res.code = "200";

        console.log("User is found", docs);
        //res.end(JSON.stringify(docs));
        callback(null, docs);
      }
    }
  )
}

function namepic_func_seller(msg, callback) {
  var res = {};
  Seller.findOneAndUpdate({ "user.email": msg.email }, { "$set": { "user.name": msg.name, "user.profileimage": msg.profileimage } },
    function (err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The user is not valid";
        console.log(res.value);

        callback(null, res);
        //res.sendStatus(400).end();
      } else {
        res.code = "200";
        console.log("Update successful");
        callback(null, res);
        //res.sendStatus(200).end();
      }
    }
  );
}

function address_func_seller(msg, callback) {
  var res = {};
  Seller.findOneAndUpdate({ "user.email": msg.email }, { "$set": { 'user.address': msg.address } },
    function (err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The user is not valid";
        console.log(res.value);
        callback(null, res);
        //res.sendStatus(400).end();
      } else {
        res.code = "200";
        console.log("Update successful for seller address");
        callback(null, res);
        //res.sendStatus(200).end();
      }
    }
  );
}



function all_sellers(msg, callback) {
  console.log("Inside kafka all seller ", msg)
  var res = {};
  if (msg.name) {
    let condition = { Name: { $regex: '.*' + msg.name + '.*' } }
    Seller.find(condition, { Name: 1 })
      .exec()
      .then(res => {
        console.log("Sellers List");
        callback(null, res);
      })
      .catch(err => {
        callback(err, null);
      })

  }
  else if (msg.sellerID) {
    Seller.find({ _id: msg.sellerID }).populate("Products")
      .exec()
      .then(res => {
        console.log("Sellers List");
        callback(null, res);
      })
      .catch(err => {
        callback(err, null);
      })
  }
  else if (msg.message) {
    let query = " SELECT SUM(Price) as Sales FROM `Order` where SellerID='"+msg.ID+"'GROUP BY MONTH(OrderDate)";
    mysql.executeQuery(query, function (err, result) {
      if (err) {
        console.log("error ", err);
        callback(err, null);
      } else {
        console.log(result)
        callback(null, result);
      }
    })
  }
  else {
    Seller.find({}, { Name: 1 })
      .exec()
      .then(res => {
        console.log("Sellers List");
        callback(null, res);
      })
      .catch(err => {
        callback(err, null);
      })
  }
}
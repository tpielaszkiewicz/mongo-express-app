const dbConfig = require("../config/db.config.js");
global.Buffer = global.Buffer || require('buffer').Buffer;
// add global btoa and atob functions
if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer.from(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer.from(b64Encoded, 'base64').toString('binary');
  };
}
// const Promise = require('promise');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);

db.login = function (req) {
   // var oHeaders = JSON.stringify(req.headers);
    var sAuth = req.headers["authorization"];
    var sUnamePwd = atob(sAuth);
    var oPromise = new Promise(function(resolve, reject){
        var sPath = (process.env.MONGODB_URI) ? `mongodb://${sUnamePwd}` + this.url : this.url;
        this.mongoose
            .connect(sPath, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Connected to the database!");
                resolve();
            })
            .catch(err => {
                console.log("Cannot connect to the database!", err);
                reject();
            });
    }.bind(this));
    return oPromise;
}

db.logout = function () {
    this.mongoose.connection.close();
    console.log("Disconnected from the database!");
}


module.exports = db;

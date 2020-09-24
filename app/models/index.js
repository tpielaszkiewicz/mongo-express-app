const dbConfig = require("../config/db.config.js");
// const Promise = require('promise');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);

db.login = function (uname, pwd) {
    var oPromise = new Promise(function(resolve, reject){
        this.mongoose
            .connect(this.url, {
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

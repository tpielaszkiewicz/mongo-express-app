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

db._login = function (req, res) {
    // var oHeaders = JSON.stringify(req.headers);
    var sAuth = req.headers["authorization"];
    try {
        var sUnamePwd = atob(sAuth);
        console.log(process.env.MONGODB_URI);
        var oPromise = new Promise(function (resolve, reject) {
            // var sPath = (process.env.MONGODB_URI) ? `mongodb://${sUnamePwd}` + this.url : this.url;
            var sPath = `mongodb://${sUnamePwd}` + this.url;
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
                    reject();
                });
        }.bind(this));
    } catch {
        return Promise.reject();
    }

    return oPromise;
}

db._logout = function () {
    this.mongoose.connection.close();
    console.log("Disconnected from the database!");
}

db.call = function (req, res, fnHandler) {
    this._login(req, res).then(function () {
        var oCallPromise = fnHandler.call(this, req, res);
        oCallPromise.then(function () {
            this._logout();
        }.bind(this)).catch(function () {
            res.status(500);
            res.send('Call failed');
        });
    }.bind(this)).catch(function () {
        res.status(401);
        res.send('Authentication failed');
    });
}


module.exports = db;

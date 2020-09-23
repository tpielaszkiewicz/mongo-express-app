var sPath = process.env.MONGODB_URI ||  "mongodb://localhost:27017";

module.exports = {
  url: sPath + "/tomek_db" 
};

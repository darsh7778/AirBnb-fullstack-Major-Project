const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlist";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // Clear existing listings
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6883886ecf594c6ec60b01d8",
  }));
  await Listing.insertMany(initData.data); //initData is object imported from data.js
  console.log("data was initialized");
};

initDB();

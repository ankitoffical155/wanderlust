require("dotenv").config();
require("node:dns").setServers(["8.8.8.8","1.1.1.1"]);
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL =process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
    return initDB();
}).catch((err) =>{
    console.log(err);
    process.exit(1);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner:"6b05860274b874ccce90d379" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
    process.exit();
}


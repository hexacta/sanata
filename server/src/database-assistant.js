import { MongoClient } from "mongodb";

let db = null;
async function getDb() {
  if (!db) {
    //TODO move to .env
    //docker run -d -p 27017:27017 mongo
    const url = "mongodb://localhost:27017/sanata";
    console.log("connecting to db...");
    db = await MongoClient.connect(url);
    //TODO support working without database
    console.log("connected");
  }
  return db;
}

async function getInfoCollection() {
  const INFO_COL = "info";
  const db = await getDb();
  return db.collection(INFO_COL);
}

async function getInfo(username) {
  const coll = await getInfoCollection();
  const info = await coll.findOne({ username });
  return info;
}

async function getAllInfo() {
  const coll = await getInfoCollection();
  const all = await coll.find().toArray();
  return all;
}

async function updateInfo(info) {
  const coll = await getInfoCollection();
  const username = info.username;
  return coll.update({ username }, { $set: info }, { upsert: true });
}

export default {
  get: getInfo,
  getAll: getAllInfo,
  save: updateInfo
};

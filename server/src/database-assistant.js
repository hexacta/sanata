import { MongoClient } from "mongodb";
import logger from "winston";

let db = null;
async function getDb() {
  if (!db) {
    //TODO move to .env
    //docker run -d -p 27017:27017 mongo
    // const url = "mongodb://localhost:27017/sanata";
    const url = "mongodb://mongo:27017/sanata";
    logger.info("Connecting to db...");
    db = await MongoClient.connect(url);
    //TODO support working without database
    logger.info("Connected to db");
  }
  return db;
}

async function getInfoCollection() {
  const INFO_COL = "info";
  const db = await getDb();
  return db.collection(INFO_COL);
}

function serialize(info) {
  if (!info) return info;
  return Object.assign({}, info, {
    model: JSON.stringify(info.model)
  });
}

function deserialize(info) {
  if (!info) return info;
  return Object.assign({}, info, {
    model: JSON.parse(info.model)
  });
}

async function getInfo(username) {
  const coll = await getInfoCollection();
  const info = await coll.findOne({ username });
  return deserialize(info);
}

async function getAllInfo() {
  const coll = await getInfoCollection();
  const all = await coll.find().toArray().map(deserialize);
  return all;
}

async function updateInfo(info) {
  const coll = await getInfoCollection();
  const username = info.username;
  return coll.update({ username }, { $set: serialize(info) }, { upsert: true });
}

export default {
  get: getInfo,
  getAll: getAllInfo,
  save: updateInfo
};

import { MongoClient } from "mongodb";
import logger from "winston";
import DbMock from "./database-mock";

let db = null;
async function getDb() {
  if (db) {
    return db;
  }

  const url = process.env.MONGO_URL;
  if (!url) {
    logger.warn("Database URL not found, using db mock");
    db = new DbMock();
  } else {
    logger.info(`Connecting to db at ${url}...`);
    db = await MongoClient.connect(url);
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

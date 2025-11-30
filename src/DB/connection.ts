import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);

let DB: Db;
let TasksCollection: Collection;

export const connectToDB = async () => {
  try {
    await client.connect();
    console.log(client);
    DB = client.db("LiorDataBase");
    TasksCollection = DB.collection("Tasks");
    console.log(
      `Connected to DB! ${DB.databaseName} - collection ${TasksCollection.collectionName}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
await connectToDB();

export const getDB = () => DB;
export const getTasksCollection = () => TasksCollection;

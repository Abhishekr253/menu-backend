
// const {MongoClient} = require('mongodb')

// let db;
// const client = new MongoClient(process.env.URI);

// const connectToDB = async () => {
//   if (!db) {
//     try {
//       await client.connect();
//       db = client.db(process.env.DATABASENAME);
//       console.log("Connected to the database");
//     } catch (error) {
//       console.log(`Error connecting to the database: ${error?.message}`);
//       throw error;
//     }
//   }
//   return db;
// };

//  const getMenuCollection = async () => {
//   const db = await connectToDB();
//   return db.collection("menu");
  
// };
// const getItemCollection = async ()=>{
//     const db = await connectToDB();
//     return db.collection("item")
// }
// module.exports = { getMenuCollection, getItemCollection }

const { MongoClient } = require("mongodb");

let db;
const client = new MongoClient(process.env.URI);

const connectToDB = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db(process.env.DATABASENAME);
      console.log("Connected to the database");
    } catch (error) {
      console.error("Database connection error:", error.message);
      throw error;
    }
  }
  return db;
};

const getMenuCollection = async () => {
  const db = await connectToDB();
  return db.collection("menu");
};

const getItemCollection = async () => {
  const db = await connectToDB();
  return db.collection("menu"); // Both use "menu" collection
};

module.exports = { getMenuCollection, getItemCollection };

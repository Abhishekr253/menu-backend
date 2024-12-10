// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const { getMenuCollection, getItemCollection } = require("./db/connection");

// const corsOptions = {
//   origin: "http://localhost:5173", 
//   methods: ["GET", "POST"], 
//   allowedHeaders: ["Content-Type"], 
// };

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));

// app.post("/menu", async (req, res) => {
//   console.log(req.body);
//   try {
//     const menuCollection = await getMenuCollection();
//     const result = await menuCollection.insertOne(req.body);
//     res.status(200).json({ message: "Item Added Succesfully", result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal ServerError", error });
//   }
// });

// app.get("/item", async (req, res) => {
//   console.log(req.body);
//   try {
//     const itemCollection = await getItemCollection();
//     const result = await itemCollection.find({}).toArray();
//     res.status(200).json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "InternalServver Error",error });
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Listening requests at ${process.env.PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getMenuCollection, getItemCollection } = require("./db/connection");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(express.json());
app.use(cors(corsOptions));

// POST route to add an item to the menu
app.post("/menu", async (req, res) => {
    console.log("Received body:", req.body);
  try {
    const menuCollection = await getMenuCollection();
    const result = await menuCollection.insertOne(req.body);
    res.status(200).json({ message: "Item Added Successfully", result });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// GET route to retrieve all items
app.get("/item", async (req, res) => {
    console.log("GET request to /item");
  try {
    const itemCollection = await getItemCollection();
    const result = await itemCollection.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

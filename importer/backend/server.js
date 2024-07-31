const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors"); // Import CORS
const path = require("path");

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Set up multer for file uploads
// const upload = multer({ dest: "uploads/" });

// MongoDB connection string (replace with your own)
// const mongoURI = "mongodb://localhost:27017/productsdb"; // For local MongoDB
const mongoURI =
  "mongodb+srv://joao:VolcanoChoir2024@cluster0.eteegfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // For MongoDB Atlas

mongoose
  .connect(mongoURI) // Updated: Removed deprecated options
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  category: String,
  subCategory: String,
});

const Product = mongoose.model("Product", productSchema);

// API endpoint to upload products
app.post("/upload-product", async (req, res) => {
  const { name, description, imageUrl, price, category, subCategory } =
    req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      imageUrl,
      price,
      category,
      subCategory,
    });
    await newProduct.save();
    res.status(201).send("Product uploaded successfully");
  } catch (error) {
    res.status(500).send("Error uploading product");
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

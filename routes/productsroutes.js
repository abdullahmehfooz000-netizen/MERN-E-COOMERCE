import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

//Route to  Get all products
router.get("/", getProducts);

// Route to  Create a new product
router.post("/add", createProduct);

//Route to  Update product
router.put("/update/:id", updateProduct);

// Delete product
router.delete("/delete/:id", deleteProduct);

export default router;
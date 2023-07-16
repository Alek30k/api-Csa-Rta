import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

// GET PRODUCTS
router.get("/", getProducts);

// GET PRODUCT
router.get("/single/:id", getProduct);

// ADD PRODUCT
router.post("/", createProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;

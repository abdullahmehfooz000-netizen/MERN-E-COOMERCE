import express from "express";
import {
  saveAddress,
  getAddresses,
} from "../controllers/addressController.js";

const router = express.Router();

// Save Address
router.post("/add", saveAddress);

// Get Addresses by User ID
router.get("/:userId", getAddresses);

export default router;
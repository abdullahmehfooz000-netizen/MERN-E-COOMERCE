import Address from "../models/Address.js";

// Save Address
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);

    res.status(201).json({
      message: "Address saved successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving address",
      error: error.message,
    });
  }
};

// Get Addresses by User ID
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.params.userId,
    });

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};
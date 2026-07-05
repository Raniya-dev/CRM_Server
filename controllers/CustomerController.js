import { customerModel } from "../models/CustomerModel.js";

import mongoose from "mongoose"
// 1. CREATE: Add New Customer
const createCustomer = async (req, res,next) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      status,
      notes,
    } = req.body;

    const newCustomer = await customerModel.create({
      name,
      email,
      phone,
      company,
      status,
      notes,
    });

    res.status(201).json(newCustomer);

  } catch (error) {
  next(error);
}
};

// 2. READ ALL: Get Directory List (Supports search and filtering)
const getAllCustomers = async (req, res,next) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const customers = await customerModel
      .find(query)
      .sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

// 3. READ ONE: Get Single Customer Details (For the Edit/Notes Modal)
const getCustomerById = async (req, res,next) => {
  try {
    const customer = await customerModel.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE: Modify Details or Add Notes
const updateCustomer = async (req, res,next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
        message: "Invalid Customer ID",
    });
}
  try {
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // returns the updated object and runs validation checks
    );
    if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

// 5. DELETE: Remove Customer from Database
const deleteCustomer = async (req, res,next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
        message: "Invalid Customer ID",
    });
}
  try {
    const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer successfully deleted' });
  } catch (error) {
    next(error);
  }
};

export {deleteCustomer,updateCustomer,getAllCustomers,getCustomerById,createCustomer}
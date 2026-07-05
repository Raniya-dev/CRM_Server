import express from 'express'
import {handleLogin,handleSignup} from '../controllers/AuthController.js'
import { createCustomer,getAllCustomers,getCustomerById,updateCustomer,deleteCustomer } from '../controllers/CustomerController.js';
import { authmiddleware } from '../middleware/authMiddleware.js';




const UserRouter = express.Router();




// Auth Routes
UserRouter.post('/auth/signup', handleSignup);
UserRouter.post('/auth/login', handleLogin);

// Customer CRUD Routes (Protected with JWT verification)
UserRouter.post('/createcustomers', authmiddleware, createCustomer);        // "Add New Customer" button
UserRouter.get('/getallcustomers',authmiddleware, getAllCustomers);        // Main Directory Table loads this
UserRouter.get('/getcustomer/:id', authmiddleware,getCustomerById);    // Opening the Edit Modal
UserRouter.put('/updatecustomer/:id',authmiddleware, updateCustomer);     // "Save Changes" / "Add Note" button
UserRouter.delete('/deletecustomer/:id', authmiddleware,deleteCustomer);  // Trash can icon click


export default UserRouter
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Lead", "Active", "Inactive"],
      default: "Lead",
    },
    avatarUrl: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export const customerModel = mongoose.model("Customer", customerSchema);
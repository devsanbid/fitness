import mongoose from "mongoose";
const user_scheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchase" }],
});


const PurchaseSchema = new mongoose.Schema({
  product_name: String,
  price: Number,
  addition_production: Array,
  week: Number,
  date: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
});

export const User_model = mongoose.model("account", user_scheme);
export const Purchase = mongoose.model("Purchase", PurchaseSchema);

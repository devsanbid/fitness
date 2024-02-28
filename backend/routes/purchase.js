import express from "express";
import jwt from "jsonwebtoken";
import { Purchase } from "../utils/scheme";
import { User_model } from "../utils/scheme";

export const purchase_router = express.Router();

purchase_router.post("/purchase", async (req, res) => {
  const { product_name, time, price, user_id, addition_production } = req.body;
  const newPurchase = await Purchase.create({
    product_name,
    addition_production: addition_production || null,
    week: time,
    price,
    date: Date.now(),
    user: user_id,
  });

  const user = await User_model.findById(user_id);
  if (!user)
    return res.status(404).send("There was a problem finding the user.");

  user.purchases.push(newPurchase);
  await user.save();
  res.status(200).json({ status: true, message: newPurchase });
});

purchase_router.get("/purchase", async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const users = await User_model.findById(decoded.id);
  const purchase_id = users.purchases[0].toString();
  const data = await Purchase.findById(purchase_id);
  console.log(data);
  return res.json({
    status: true,
    message: data,
  });
});

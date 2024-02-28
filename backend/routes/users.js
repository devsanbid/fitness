import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { User_model } from "../utils/scheme";

export const user_router = express.Router();
const secret_key = process.env.SECRET_KEY;

user_router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const check_email = await User_model.findOne({ email });
  if (check_email)
    return res.json({ status: false, message: "Email is already created" });

  const hashedPassword = bcrypt.hashSync(password, 8);

  const users = await User_model.create({
    name,
    email,
    password: hashedPassword,
  });
  if (!users)
    return res.json({ status: false, message: "Error on creating users" });

  return res
    .status(200)
    .json({ status: true, message: "Account created sucessfully" });
});

user_router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User_model.findOne({ email });
  if (!user)
    return res.status(404).json({ status: false, message: "No user found." });

  const passwordIsValid = await bcrypt.compare(
    password.toString(),
    user.password,
  );
  if (!passwordIsValid)
    return res.status(401).send({ status: false, message: "invalid password" });

  console.log(user)
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, purchase: user.purchases },
    secret_key,
    {
      expiresIn: 86400,
    },
  );
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.status(200).send({ status: true, message: "Login sucessfully" });
});

user_router.get("/logout", (_req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.json({ status: true, message: "delete cookies" });
});

user_router.get("/user", (req, res) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token)
    return res.json({ status: false, message: "No cookies found!!" });
  const data = jwt.verify(token, secret_key);
  return res.json({
    status: true,
    message: data,
  });
});

user_router.get("/check-cookie", (req, res) => {
  if (req.cookies.token) {
    return res.json({ status: true, message: "Cookie exists" });
  }
  return res.json({ status: false, message: "No cookie exists" });
});

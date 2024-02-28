import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { dashboard_router } from "../routes/dashboard";
import { purchase_router } from "../routes/purchase";
import { user_router } from "../routes/users";

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api", user_router);
app.use("/api", dashboard_router);
app.use("/api", purchase_router);

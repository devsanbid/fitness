import express from "express";

export const dashboard_router = express.Router();
dashboard_router.get("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ status: false, message: "Failed to authenticate token." });

    res.status(200).json({
      status: true,
      message: decoded,
    });
  });
});

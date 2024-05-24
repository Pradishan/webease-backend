import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncMiddleware from "./asyncMiddleware.js";

const authMiddleware = asyncMiddleware(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401);
    throw new Error("unauthorized - No Token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    res.status(401);
    throw new Error("unauthorized - Invalid Token provided");
  }

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {      
    res.status(404);
    throw new Error("User not found");
  }

  req.user = user;
  next();
});

export default authMiddleware;

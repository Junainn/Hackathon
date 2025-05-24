import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || decoded.role !== "student") {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const userId = decoded.id;  // make sure token payload uses 'id'
    const user = await User.findOne({ _id: userId, role: "student" }).select("-password -__v");

    if (!user) {
      const error = new Error("Unauthorized - User not found");
      error.statusCode = 401;
      return next(error);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

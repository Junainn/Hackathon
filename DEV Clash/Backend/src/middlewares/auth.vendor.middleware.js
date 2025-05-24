import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
export const authVendorMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || decoded.role !== "vendor") {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const vendorId = decoded.id;  // make sure token payload uses 'id'
    const user = await Vendor.findOne({ _id: vendorId }).select("-password -__v");

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

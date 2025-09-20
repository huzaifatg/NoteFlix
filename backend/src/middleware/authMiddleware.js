import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received:", token); // Log the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Log the decoded token

      req.user = await User.findById(decoded.id).select("-password");
      console.log("Authenticated user:", req.user); // Log the authenticated user

      if (!req.user) {
        console.log("User not found in the database"); // Debugging log
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.error("Token expired:", error.message); // Log token expiration errors
        return res.status(401).json({ message: "Session expired, please log in again" });
      }

      console.error("Token verification failed:", error.message); // Log token verification errors
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No Authorization header found"); // Log if the Authorization header is missing
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
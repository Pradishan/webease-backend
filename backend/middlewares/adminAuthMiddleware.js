import asyncMiddleware from "./asyncMiddleware.js";

const adminAuthMiddleware = asyncMiddleware(async (req, res, next) => {
  const role = req.user?.role;
  if (role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("unauthorized - Not an Admin User");
  }
});

export default adminAuthMiddleware;

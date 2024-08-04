import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, //expires in 15 days
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 //convert days to milliseconds
    ),
    httpOnly: true, //prevents client side js from reading the cookie
    sameSite: "strict", //prevent csrf attacks by not allowing other domains to access the cookie
    secure: process.env.NODE_ENV !== "development", // Only send cookies over HTTPS when not in development
  };

  res.cookie("jwt", token, options);
  if (role == "admin") {
    res.cookie("role", role, options);
  }
  return token;
};

export default generateTokenAndSetCookie;

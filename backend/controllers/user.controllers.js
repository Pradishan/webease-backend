import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import User from "../models/user.model.js";

const getUsers = asyncMiddleware(async (req, res) => {
    const loggedUserID = req.user._id;
    const users = await User.find({ _id: { $ne: loggedUserID } }).select(
      "-password"
    );
    res.status(200).json(users);
});
const getUsersadmin = asyncMiddleware(async (req, res) => {
    const loggedUserID = req.user._id;
    const users = await User.find({ _id: { $ne: loggedUserID } }).select(
      "-password"
    );
    res.status(200).json(users);
});

export { getUsers,getUsersadmin };

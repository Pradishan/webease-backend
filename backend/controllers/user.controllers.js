import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import User from "../models/user.model.js";

const getUsers = asyncMiddleware(async (req, res) => {
  const loggedUserID = req.user._id;
  const users = await User.find({ _id: { $ne: loggedUserID } }).select(
    "-password"
  );
  res.status(200).json(users);
});

const getAllUsers = asyncMiddleware(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  const users = await User.find({}).select("-password").skip(skip).limit(limit);

  const totalUsers = await User.countDocuments();

  if (users.length === 0) {
    res.status(404);
    throw new Error("No users found");
  }
  if (!users) {
    throw new Error("Error fetching users");
  }
  res.status(200).json({
    users,
    totalPages: Math.ceil(totalUsers / limit),
  });
});

const getUser = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const user = await User.findById(_id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

const updateUser = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const user = await User.findById(_id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.role = req.body.role
      ? adminAuthMiddleware(req, res, () => req.body.role)
      : user.role;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser?._id,
      username: updatedUser?.username,
      email: updatedUser?.email,
      gender: updatedUser?.gender,
      profilePic: updatedUser?.profilePic,
      role: updatedUser?.role,
      phone: updatedUser?.phone,
      address: updatedUser?.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const user = await User.findById(_id);
  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUsers, getAllUsers, getUser, updateUser, deleteUser };

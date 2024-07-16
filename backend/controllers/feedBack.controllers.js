import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import FeedBack from "../models/feedBack.model.js";

const createFeedBack = asyncMiddleware(async (req, res) => {
  const clientID = req.user._id;
  const { description, rating } = req.body;

  const newFeedBack = new FeedBack({
    clientID,
    name: req.body.name || req.user.username,
    description,
    rating,
  });

  if (newFeedBack) {
    await newFeedBack.save();

    const populatedFeedBack = await newFeedBack.populate({
      path: "clientID",
      select: "username profilePic",
    });

    res.status(201).json(populatedFeedBack);
  } else {
    res.status(400);
    throw new Error("FeedBack not created");
  }
});

const getFeedBack = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const feedBack = await FeedBack.findById(_id).populate({
    path: "clientID",
    select: ["username", "profilePic"],
  });
  if (!feedBack) {
    res.status(404);
    throw new Error("FeedBack not found");
  }
  res.status(200).json(feedBack);
});

const getAllFeedBack = asyncMiddleware(async (req, res) => {
  const feedBack = await FeedBack.find({}).populate({
    path: "clientID",
    select: ["username", "profilePic"],
  });

  if (feedBack.length === 0) {
    res.status(404);
    throw new Error("No FeedBacks found");
  }
  if (!feedBack) {
    throw new Error("Error fetching FeedBacks");
  }
  res.status(200).json(feedBack);
});

const displayFeedBack = asyncMiddleware(async (req, res) => {
  const feedBack = await FeedBack.find({ status: "Show" }).populate({
    path: "clientID",
    select: ["username", "profilePic"],
  });

  if (feedBack.length === 0) {
    res.status(404);
    throw new Error("No FeedBacks found");
  }
  if (!feedBack) {
    throw new Error("Error fetching FeedBacks");
  }
  res.status(200).json(feedBack);
});

const getAllFeedBackByClientId = asyncMiddleware(async (req, res) => {
  const clientID = req.params.clientID;
  const feedBack = await FeedBack.find({ clientID }).populate({
    path: "clientID",
    select: ["username", "profilePic"],
  });

  if (feedBack.length === 0) {
    res.status(404);
    throw new Error("No FeedBack found");
  }
  if (!feedBack) {
    throw new Error("Error fetching FeedBack");
  }
  res.status(200).json(feedBack);
});

const updateFeedBack = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const feedBack = await FeedBack.findById(_id).populate({
    path: "clientID",
    select: ["username", "profilePic"],
  });

  if (feedBack) {
    feedBack.name = req.body.name || feedBack.name;
    feedBack.description = req.body.description || feedBack.description;
    feedBack.rating = req.body.rating || feedBack.rating;
    feedBack.status = req.body.status || feedBack.status;

    const updatedFeedBack = await feedBack.save();

    res.json(updatedFeedBack);
  } else {
    res.status(404);
    throw new Error("FeedBack not found");
  }
});

const deleteFeedBack = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const feedBack = await FeedBack.findById(_id);

  if (feedBack) {
    await feedBack.deleteOne();
    res.json({ message: "FeedBack removed" });
  } else {
    res.status(404);
    throw new Error("FeedBack not found");
  }
});

export {
  createFeedBack,
  getFeedBack,
  getAllFeedBack,
  getAllFeedBackByClientId,
  updateFeedBack,
  deleteFeedBack,
  displayFeedBack,
};

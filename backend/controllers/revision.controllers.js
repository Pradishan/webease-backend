import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Order from "../models/order.model.js";
import Revision from "../models/revision.model.js";

const createRevision = asyncMiddleware(async (req, res) => {
  let orderID = req.params.orderID;
  const clientID = req.user._id;
  const { description, images, files, status } = req.body;

  if (!orderID) {
    res.status(400);
    throw new Error("Order ID is required");
  }

  const order = await Order.findById({ _id: orderID });

  if (!order) {
    res.status(400);
    throw new Error("oreder not found");
  }

  const newRevision = new Revision({
    clientID,
    orderID,
    description,
    images,
    files,
    status,
  });

  if (newRevision) {
    await newRevision.save();

    res.status(201).json(newRevision);
  } else {
    res.status(400);
    throw new Error("Revision not created");
  }
});

const getRevision = asyncMiddleware(async (req, res) => {
  let _id = req.params.revisionID;
  const revision = await Revision.findById(_id);
  if (!revision) {
    res.status(404);
    throw new Error("Revision not found");
  }
  res.status(200).json(revision);
});

const getAllRevisions = asyncMiddleware(async (req, res) => {
  const revisions = await Revision.find({});

  if (revisions.length === 0) {
    res.status(404);
    throw new Error("No Revision found");
  }
  if (!revisions) {
    throw new Error("Error fetching Revisions");
  }
  res.status(200).json(revisions);
});

const getAllRevisionsByOrderId = asyncMiddleware(async (req, res) => {
  let orderID = req.params.orderID;
  const revisions = await Revision.find({ orderID });

  if (revisions.length === 0) {
    res.status(404);
    throw new Error("No Revision found");
  }
  if (!revisions) {
    throw new Error("Error fetching Revisions");
  }
  res.status(200).json(revisions);
});

const getAllRevisionsByClientId = asyncMiddleware(async (req, res) => {
  const clientID = req.params.clientID;
  const revisions = await Revision.find({ clientID });

  if (revisions.length === 0) {
    res.status(404);
    throw new Error("No Revision found");
  }
  if (!revisions) {
    throw new Error("Error fetching Revisions");
  }
  res.status(200).json(revisions);
});

const updateRevision = asyncMiddleware(async (req, res) => {
  let _id = req.params.revisionID;

  const revision = await Revision.findById(_id);

  if (revision) {
    revision.categoryID = req.body.categoryID || revision.categoryID;
    revision.subCategoryID = req.body.subCategoryID || revision.subCategoryID;
    revision.name = req.body.name || revision.name;
    revision.purpose = req.body.purpose || revision.purpose;
    revision.description = req.body.description || revision.description;
    revision.content = req.body.content || revision.content;
    revision.colorTheme = req.body.colorTheme || revision.colorTheme;
    revision.images = req.body.images || revision.images;
    revision.files = req.body.files || revision.files;
    revision.status = req.body.status || revision.status;

    const updatedRevision = await revision.save();

    res.json(updatedRevision);
  } else {
    res.status(404);
    throw new Error("Revision not found");
  }
});

const deleteRevision = asyncMiddleware(async (req, res) => {
  let _id = req.params.revisionID;

  const revision = await Revision.findById(_id);

  if (revision) {
    await revision.deleteOne();
    res.json({ message: "Revision removed" });
  } else {
    res.status(404);
    throw new Error("Revision not found");
  }
});

export {
  createRevision,
  getRevision,
  getAllRevisions,
  getAllRevisionsByOrderId,
  getAllRevisionsByClientId,
  updateRevision,
  deleteRevision,
};

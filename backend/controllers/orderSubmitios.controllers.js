import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Order from "../models/order.model.js";
import OrderSubmition from "../models/orderSubmition.model.js";

const createOrderSubmition = asyncMiddleware(async (req, res) => {
  let orderID = req.params.orderID;

  const { description, images, files, clientID } = req.body;

  if (!orderID) {
    res.status(400);
    throw new Error("Order ID is required");
  }

  const order = await Order.findById({ _id: orderID });

  if (!order) {
    res.status(400);
    throw new Error("oreder not found");
  }

  const newOrderSubmition = new OrderSubmition({
    clientID,
    orderID,
    description,
    images,
    files,
  });

  if (newOrderSubmition) {
    await newOrderSubmition.save();

    res.status(201).json(newOrderSubmition);
  } else {
    res.status(400);
    throw new Error("OrderSubmition not created");
  }
});

const getOrderSubmition = asyncMiddleware(async (req, res) => {
  let _id = req.params.orderSubmitionID;
  const orderSubmition = await OrderSubmition.findById(_id);
  if (!orderSubmition) {
    res.status(404);
    throw new Error("orderSubmition not found");
  }
  res.status(200).json(orderSubmition);
});

const getAllOrderSubmitions = asyncMiddleware(async (req, res) => {
  const orderSubmitions = await OrderSubmition.find({});

  if (orderSubmitions.length === 0) {
    res.status(404);
    throw new Error("No orderSubmitions found");
  }
  if (!orderSubmitions) {
    throw new Error("Error fetching orderSubmitions");
  }
  res.status(200).json(orderSubmitions);
});

const getAllOrderSubmitionsByOrderId = asyncMiddleware(async (req, res) => {
  let orderID = req.params.orderID;
  const orderSubmitions = await OrderSubmition.find({ orderID });

  if (orderSubmitions.length === 0) {
    res.status(404);
    throw new Error("No OrderSubmitions found");
  }
  if (!orderSubmitions) {
    throw new Error("Error fetching OrderSubmitions");
  }
  res.status(200).json(orderSubmitions);
});

const getAllOrderSubmitionsByClientId = asyncMiddleware(async (req, res) => {
  const clientID = req.params.clientID;
  const orderSubmitions = await OrderSubmition.find({ clientID });

  if (orderSubmitions.length === 0) {
    res.status(404);
    throw new Error("No orderSubmition found");
  }
  if (!orderSubmitions) {
    throw new Error("Error fetching orderSubmitions");
  }
  res.status(200).json(orderSubmitions);
});

const updateOrderSubmition = asyncMiddleware(async (req, res) => {
  let _id = req.params.orderSubmitionID;

  const orderSubmition = await OrderSubmition.findById(_id);

  if (orderSubmition) {
    orderSubmition.clientID = req.body.clientID || orderSubmition.clientID;
    orderSubmition.orderID = req.body.orderID || orderSubmition.orderID;
    orderSubmition.name = req.body.name || orderSubmition.name;
    orderSubmition.description =
      req.body.description || orderSubmition.description;
    orderSubmition.files = req.body.files || orderSubmition.files;

    const updatedOrderSubmition = await orderSubmition.save();

    res.json(updatedOrderSubmition);
  } else {
    res.status(404);
    throw new Error("OrderSubmition not found");
  }
});

const deleteOrderSubmition = asyncMiddleware(async (req, res) => {
  let _id = req.params.orderSubmitionID;

  const orderSubmition = await OrderSubmition.findById(_id);

  if (orderSubmition) {
    await orderSubmition.deleteOne();
    res.json({ message: "orderSubmition removed" });
  } else {
    res.status(404);
    throw new Error("orderSubmition not found");
  }
});

export {
  createOrderSubmition,
  getOrderSubmition,
  getAllOrderSubmitions,
  getAllOrderSubmitionsByOrderId,
  getAllOrderSubmitionsByClientId,
  updateOrderSubmition,
  deleteOrderSubmition,
};

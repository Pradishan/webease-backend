import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Order from "../models/order.model.js";
import OrderRequest from "../models/orderRequest.model.js";

const createOrder = asyncMiddleware(async (req, res) => {
  const clientID = req.user._id;
  const {
    categoryID,
    subCategoryID,
    name,
    purpose,
    description,
    content,
    colorTheme,
    images,
    files,
    status,
  } = req.body;

  const newOrder = new Order({
    clientID,
    categoryID,
    subCategoryID,
    name,
    purpose,
    description,
    content,
    colorTheme,
    images,
    files,
    status,
  });

  if (newOrder) {
    await newOrder.save();
    const orderRequest = await createOrderRequest(req, res, newOrder._id);

    if (!orderRequest) {
      res.status(400);
      throw new Error("Order request not created");
    }

    res.status(201).json({ newOrder: newOrder, orderRequest: orderRequest });
  } else {
    res.status(400);
    throw new Error("Order not created");
  }
});

const createOrderRequest = asyncMiddleware(async (req, res, orderID) => {
  const clientID = req.user._id;

  const newOrderRequest = new OrderRequest({
    clientID,
    orderID,
  });

  if (newOrderRequest) {
    await newOrderRequest.save();
    return newOrderRequest;
  } else {
    res.status(400);
    throw new Error("Order not created");
  }
});

const getOrder = asyncMiddleware(async (req, res) => {
  let orderID = req.params.orderID;
  const order = await Order.findById({ _id: orderID })
    .populate({
      path: "categoryID",
      select: "name",
    })
    .populate({
      path: "subCategoryID",
      select: "name",
    });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.status(200).json(order);
});

const getOrdreRequest = asyncMiddleware(async (req, res) => {
  let orderRequestID = req.params.orderRequestID;
  const orderRequest = await OrderRequest.findById({
    _id: orderRequestID,
  }).populate({
    path: "orderID",
    select: ["categoryID", "subCategoryID"],
    populate: [
      { path: "categoryID", select: "name" },
      { path: "subCategoryID", select: "name" },
    ],
  });
  if (!orderRequest) {
    res.status(404);
    throw new Error("OrderRequests not found");
  }
  res.status(200).json(orderRequest);
});

const getOrdreRequestByClient = asyncMiddleware(async (req, res) => {
  const clientID = req.user._id;

  const orderRequests = await OrderRequest.find({ clientID }).populate({
    path: "orderID",
    select: ["categoryID", "subCategoryID"],
    populate: [
      { path: "categoryID", select: "name" },
      { path: "subCategoryID", select: "name" },
    ],
  });
  if (!orderRequests) {
    res.status(404);
    throw new Error("OrderRequests not found");
  }
  res.status(200).json(orderRequests);
});

const getAllOrdreRequests = asyncMiddleware(async (req, res) => {
  const orderRequests = await OrderRequest.find({}).populate({
    path: "orderID",
    select: ["categoryID", "subCategoryID"],
    populate: [
      { path: "categoryID", select: "name" },
      { path: "subCategoryID", select: "name" },
    ],
  });

  if (orderRequests.length === 0) {
    res.status(404);
    throw new Error("No orderRequest found");
  }
  if (!orderRequests) {
    throw new Error("Error fetching orderRequests");
  }
  res.status(200).json(orderRequests);
});

const getAllOrders = asyncMiddleware(async (req, res) => {
  const orders = await Order.find({})
    .populate({
      path: "categoryID",
      select: "name",
    })
    .populate({
      path: "subCategoryID",
      select: "name",
    });

  if (orders.length === 0) {
    res.status(404);
    throw new Error("No order found");
  }
  if (!orders) {
    throw new Error("Error fetching orders");
  }
  res.status(200).json(orders);
});

const getAllOrdersByClientID = asyncMiddleware(async (req, res) => {
  const clientID = req.params.clientID;
  const orders = await Order.find({ clientID })
    .populate({
      path: "categoryID",
      select: "name",
    })
    .populate({
      path: "subCategoryID",
      select: "name",
    });

  if (orders.length === 0) {
    res.status(404);
    throw new Error("No order found");
  }
  if (!orders) {
    throw new Error("Error fetching orders");
  }
  res.status(200).json(orders);
});

const updateOrder = asyncMiddleware(async (req, res) => {
  let orderID = req.params.orderID;

  const order = await Order.findById({ _id: orderID });

  if (order) {
    order.clientID = req.body.clientID || order.clientID;
    order.categoryID = req.body.categoryID || order.categoryID;
    order.subCategoryID = req.body.subCategoryID || order.subCategoryID;
    order.name = req.body.name || order.name;
    order.purpose = req.body.purpose || order.purpose;
    order.description = req.body.description || order.description;
    order.content = req.body.content || order.content;
    order.colorTheme = req.body.colorTheme || order.colorTheme;
    order.images = req.body.images || order.images;
    order.files = req.body.files || order.files;
    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

const deleteOrder = asyncMiddleware(async (req, res) => {
  let orderID = req.params.orderID;

  const order = await Order.findById({ _id: orderID });

  if (order) {
    await order.deleteOne();
    res.json({ message: "Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderRequest = asyncMiddleware(async (req, res) => {
  let orderRequestID = req.params.orderRequestID;

  const orderRequest = await OrderRequest.findById({ _id: orderRequestID });

  if (orderRequest) {
    orderRequest.totalPrice = req.body.totalPrice || orderRequest.totalPrice;
    orderRequest.advance = req.body.advance || orderRequest.advance;
    orderRequest.status = req.body.status || orderRequest.status;
    orderRequest.statusClient =
      req.body.statusClient || orderRequest.statusClient;

    const updatedOrderRequest = await orderRequest.save();

    res.json(updatedOrderRequest);
  } else {
    res.status(404);
    throw new Error("orderRequest not found");
  }
});

const deleteOrderRequest = asyncMiddleware(async (req, res) => {
  let orderRequestID = req.params.orderRequestID;

  const orderRequest = await OrderRequest.findById({ _id: orderRequestID });

  if (orderRequest) {
    await orderRequest.deleteOne();
    res.json({ message: "orderRequest removed" });
  } else {
    res.status(404);
    throw new Error("orderRequest not found");
  }
});

export {
  createOrder,
  getOrder,
  getAllOrders,
  getAllOrdersByClientID,
  updateOrder,
  deleteOrder,
  getOrdreRequest,
  getAllOrdreRequests,
  updateOrderRequest,
  deleteOrderRequest,
  getOrdreRequestByClient,
};

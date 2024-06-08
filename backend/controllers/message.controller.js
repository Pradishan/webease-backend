import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketID } from "../socket/socket.js";
import { io } from "../socket/socket.js";

const sendMessage = asyncMiddleware(async (req, res) => {
  const { message } = req.body;
  const { id: receverID } = req.params;
  const senderID = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderID, receverID] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderID, receverID],
    });
  }

  const newMessage = new Message({
    senderID,
    receverID,
    message,
  });

  if (newMessage) conversation.messages.push(newMessage._id);

  // await conversation.save();
  // await newMessage.save();

  await Promise.all([conversation.save(), newMessage.save()]);

  const receiverSocketID = getReceiverSocketID(receverID);
  if (receiverSocketID) {
    io.to(receiverSocketID).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

const getMessage = asyncMiddleware(async (req, res) => {
    const { id: receverID } = req.params;
    const senderID = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderID, receverID] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages);
});

export { sendMessage, getMessage };

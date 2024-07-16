import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import categoryRouter from "./routes/category.routes.js";
import orderRouter from "./routes/order.routes.js";
import feedBackRouter from "./routes/feedBack.routes.js";
import notFound from "./middlewares/notFoundMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const port = process.env.PORT || 5000;
// const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_API_URL,process.env.ADMIN_FRONTEND_API_URL ], // specify the exact origin
    credentials: true, // allow credentials
  })
);

app.use(express.json());
app.use(cookieParser()); //parse cookies

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/feedBack", feedBackRouter);

app.use(notFound);
app.use(errorMiddleware);

server.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`);
});

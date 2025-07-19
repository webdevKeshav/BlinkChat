import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";


const app = express();
const server = http.createServer(app);

// middleware 
app.use(express.json({limit : "4mb"}));
app.use(cors());

app.use("/api/status", (req, res)=>res.send("server is live"));
app.use("/api/auth", userRouter); 


// connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log("server is running on PORT : " + PORT));
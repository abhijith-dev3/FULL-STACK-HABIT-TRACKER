const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth",authRoutes)

const habitRoutes = require("./routes/habitRoutes");
app.use("/api/habits",habitRoutes);

const protect = require("./middleware/authMiddleware");

app.get("/api/health", (req,res) => {
    res.json({message:"Server is running"})
})

app.get("/api/protected", protect,(req,res) => {
    res.json({
        message:"You are authorized",
        user:req.user
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})



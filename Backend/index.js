const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const authRouter = require("./routes/auth/authRoutes");
const projectRouter = require("./routes/project/projectRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect MongoDB
connectDB();

const _dirname = path.resolve();

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);

app.use(express.static(path.join(_dirname, "Frontend","dist")));
app.get(/.*/,(_,res)=>{
  res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

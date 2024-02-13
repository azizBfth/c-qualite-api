const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/users");
const departementRoutes = require("./routes/dapartement");
const ofRoutes = require("./routes/of");
const sessionRoutes = require("./routes/session");
const isAuth = require(".//middlewares/is-auth");
const path = require("path");

const cookieParser = require("cookie-parser");

const cors = require("cors");
const OF = require("./models/ofModel");



app.use(cookieParser());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(isAuth);

//routes
app.use("/api", userRoutes);
app.use("/api", sessionRoutes);
app.use("/api", ofRoutes);
app.use("/api", departementRoutes);
app.use("/", ofRoutes);

/*
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

*/


app.get("/of", async (req, res) => {
  try {
    const ofs = await OF.find({});
    res.status(200).json(ofs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// mongoose cloud
// mongodb+srv://emkatech:EE06BC23F2@devgafsaapi.mkcickp.mongodb.net/api?retryWrites=true&w=majority'
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://mongo:27017/cqualitedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(80, () => {
      console.log(`Node API app is running on port 80`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const animeRoutes = require("./routes/animeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/animeDB")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.use("/api/anime", animeRoutes);

app.get("/", (req, res) => {
    res.send("AniVerseX backend running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
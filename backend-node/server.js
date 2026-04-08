const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const animeRoutes = require("./routes/animeRoutes");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/animeDB";

app.use(cors());
app.use(express.json());

mongoose.connect(mongoUri)
  .then(() => {
    animeRoutes.setDatabaseReady(true);
    console.log("MongoDB connected");
  })
  .catch((err) => {
    animeRoutes.setDatabaseReady(false);
    console.log("MongoDB unavailable. Falling back to in-memory data store.");
    console.log(err.message);
  });

app.use("/api/anime", animeRoutes);

app.get("/", (req, res) => {
    res.json({
      application: "AniVerseX",
      message: "Backend running",
      endpoints: [
        "GET /api/anime",
        "POST /api/anime",
        "PUT /api/anime/:id",
        "DELETE /api/anime/:id"
      ]
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

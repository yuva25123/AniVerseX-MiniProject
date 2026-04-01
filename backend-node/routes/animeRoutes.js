const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");

// Get all anime
router.get("/", async (req, res) => {
    const anime = await Anime.find();
    res.json(anime);
});

// Add anime
router.post("/", async (req, res) => {
    const newAnime = new Anime(req.body);
    const savedAnime = await newAnime.save();
    res.json(savedAnime);
});

router.delete("/:id", async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.json({ message: "Anime deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete anime" });
  }
});

module.exports = router;
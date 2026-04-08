const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");
let databaseReady = false;

const sampleAnime = [
  {
    _id: "seed-1",
    title: "Attack on Titan",
    genre: "Action",
    description: "Humanity fights for survival against giant Titans behind massive walls.",
    image: "",
    year: 2013,
    rating: 4.9,
    review: "Intense story, strong world building, and memorable twists."
  },
  {
    _id: "seed-2",
    title: "Death Note",
    genre: "Thriller",
    description: "A brilliant student discovers a notebook that can kill anyone whose name is written in it.",
    image: "",
    year: 2006,
    rating: 4.8,
    review: "Smart pacing and excellent psychological conflict."
  }
];

let memoryAnime = [...sampleAnime];

const isDatabaseReady = () => databaseReady;

const normalizeAnimePayload = (payload) => ({
  title: payload.title?.trim(),
  genre: payload.genre?.trim(),
  description: payload.description?.trim(),
  image: payload.image?.trim() || "",
  year: Number(payload.year),
  rating: payload.rating !== undefined && payload.rating !== "" ? Number(payload.rating) : 0,
  review: payload.review?.trim() || ""
});

const validateAnimePayload = (anime) => {
  if (!anime.title || !anime.genre || !anime.description || Number.isNaN(anime.year)) {
    return "Title, genre, description, and a valid year are required.";
  }

  if (anime.rating < 0 || anime.rating > 5) {
    return "Rating must be between 0 and 5.";
  }

  return null;
};

router.get("/", async (_req, res) => {
  try {
    if (isDatabaseReady()) {
      const anime = await Anime.find().sort({ year: -1, title: 1 });
      return res.json(anime);
    }

    return res.json(memoryAnime);
  } catch (err) {
    return res.status(500).json({ error: "Failed to load anime list." });
  }
});

router.post("/", async (req, res) => {
  try {
    const anime = normalizeAnimePayload(req.body);
    const validationError = validateAnimePayload(anime);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    if (isDatabaseReady()) {
      const savedAnime = await new Anime(anime).save();
      return res.status(201).json(savedAnime);
    }

    const savedAnime = {
      ...anime,
      _id: `memory-${Date.now()}`
    };
    memoryAnime = [savedAnime, ...memoryAnime];
    return res.status(201).json(savedAnime);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add anime." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const anime = normalizeAnimePayload(req.body);
    const validationError = validateAnimePayload(anime);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    if (isDatabaseReady()) {
      const updatedAnime = await Anime.findByIdAndUpdate(req.params.id, anime, { new: true });
      return res.json(updatedAnime);
    }

    memoryAnime = memoryAnime.map((item) =>
      item._id === req.params.id ? { ...item, ...anime } : item
    );

    return res.json(memoryAnime.find((item) => item._id === req.params.id));
  } catch (err) {
    return res.status(500).json({ error: "Failed to update anime." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (isDatabaseReady()) {
      await Anime.findByIdAndDelete(req.params.id);
      return res.json({ message: "Anime deleted successfully" });
    }

    memoryAnime = memoryAnime.filter((item) => item._id !== req.params.id);
    return res.json({ message: "Anime deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete anime" });
  }
});

module.exports = router;
module.exports.setDatabaseReady = (value) => {
  databaseReady = Boolean(value);
};

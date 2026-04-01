"use strict";

// Class-based object model for anime items.
class Anime {
  constructor(id, title, year, episodes, genres, description) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.episodes = episodes;
    this.genres = genres;
    this.description = description;
    this.favorite = false;
    this.reviews = [];
  }
}

// In-memory data store (offline, no API usage).
const animeList = [
  new Anime(
    1,
    "Attack on Titan",
    2013,
    89,
    ["Action", "Drama", "Dark Fantasy"],
    "In a world behind giant walls, humanity faces terrifying Titans while soldiers uncover hidden truths."
  ),
  new Anime(
    2,
    "Demon Slayer",
    2019,
    55,
    ["Action", "Adventure", "Supernatural"],
    "A determined boy joins the Demon Slayer Corps to protect his sister and challenge dangerous demons."
  ),
  new Anime(
    3,
    "Death Note",
    2006,
    37,
    ["Psychological", "Thriller", "Mystery"],
    "A genius student discovers a notebook with deadly power and enters a mind game with a brilliant detective."
  ),
  new Anime(
    4,
    "Naruto",
    2002,
    220,
    ["Action", "Adventure", "Shonen"],
    "A young ninja with big dreams trains, grows, and protects his village through difficult missions."
  )
];

const posterMap = {
  "Death Note": "../assets/images/deathnote.jpg",
  Naruto: "../assets/images/naruto.jpg",
  "Attack on Titan": "../assets/images/aot.jpg",
  "Demon Slayer": "../assets/images/demon_slayer.jpg"
};

// Factory function for review objects.
const createReviewObject = (name, rating, text) => ({
  id: Date.now(),
  name,
  rating,
  text,
  createdAt: new Date().toLocaleString()
});

// DOM references.
const reviewForm = document.getElementById("reviewForm");
const animeSelect = document.getElementById("animeSelect");
const ratingRange = document.getElementById("ratingRange");
const ratingValue = document.getElementById("ratingValue");
const reviewerName = document.getElementById("reviewerName");
const reviewText = document.getElementById("reviewText");
const addReviewBtn = document.getElementById("addReviewBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const resetBtn = document.getElementById("resetBtn");
const detailsCard = document.getElementById("detailsCard");
const hoverStatus = document.getElementById("hoverStatus");
const animeDetails = document.getElementById("animeDetails");
const reviewsList = document.getElementById("reviewsList");
const reviewsHeading = document.getElementById("reviewsHeading");
const toast = document.getElementById("toast");

let toastTimer;

const getSelectedAnime = () => {
  const selectedId = Number(animeSelect.value);
  return animeList.find(({ id }) => id === selectedId);
};

const showToast = (message, type = "") => {
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
};

const renderAnimeOptions = () => {
  animeSelect.innerHTML = animeList
    .map(({ id, title }) => `<option value="${id}">${title}</option>`)
    .join("");
};

const renderAnime = () => {
  const anime = getSelectedAnime();
  if (!anime) return;

  // Destructuring + template literals for dynamic UI generation.
  const { title, year, episodes, genres, description, favorite } = anime;
  const posterSrc = posterMap[title] || "../assets/images/deathnote.jpg";

  detailsCard.classList.toggle("favorite", favorite);
  favoriteBtn.textContent = favorite ? "Remove Favorite" : "Add to Favorites";

  animeDetails.innerHTML = `
    <h2>${title}</h2>
    <img id="animePoster" class="anime-poster" src="${posterSrc}" alt="Anime Poster" />
    <p><strong>Year:</strong> ${year}</p>
    <p><strong>Episodes:</strong> ${episodes}</p>
    <div>
      <strong>Genres:</strong>
      <div class="genres">
        ${genres.map((genre) => `<span class="genre-pill">${genre}</span>`).join("")}
      </div>
    </div>
    <p><strong>Description:</strong> ${description}</p>
  `;

  renderReviews();
};

const renderReviews = () => {
  const anime = getSelectedAnime();
  if (!anime) return;

  // Using filter to safely render only valid review text.
  const visibleReviews = anime.reviews.filter(({ text }) => text.trim().length > 0);
  reviewsHeading.textContent = `Reviews (${visibleReviews.length})`;

  reviewsList.innerHTML = visibleReviews.length
    ? visibleReviews
        .map(
          ({ name, rating, text, createdAt }) => `
            <article class="review-card">
              <p><strong>${name}</strong> rated <strong>${rating}/5</strong></p>
              <p>${text}</p>
              <p><small>${createdAt}</small></p>
            </article>
          `
        )
        .join("")
    : '<p class="empty-state">No reviews yet. Be the first to add one.</p>';
};

const validateForm = () => {
  const name = reviewerName.value.trim();
  const text = reviewText.value.trim();

  if (!name || !text) {
    showToast("Name and review are required.", "error");
    return false;
  }
  return true;
};

const addReview = () => {
  if (!validateForm()) return;

  const anime = getSelectedAnime();
  if (!anime) return;

  const name = reviewerName.value.trim();
  const text = reviewText.value.trim();
  const rating = Number(ratingRange.value);

  const newReview = createReviewObject(name, rating, text);

  // Spread operator to update in-memory reviews array immutably.
  anime.reviews = [...anime.reviews, newReview];

  renderReviews();
  reviewText.value = "";
  showToast("Review Added");
};

const toggleFavorite = () => {
  const anime = getSelectedAnime();
  if (!anime) return;

  anime.favorite = !anime.favorite;
  renderAnime();
  showToast(anime.favorite ? "Added to Favorites" : "Removed from Favorites");
};

const resetForm = () => {
  reviewerName.value = "";
  reviewText.value = "";
  ratingRange.value = "3";
  ratingValue.textContent = "3";
  showToast("Form Reset");
};

const init = () => {
  renderAnimeOptions();
  animeSelect.value = String(animeList[0].id);
  renderAnime();
};

// Event Handling Section (all via addEventListener).
animeSelect.addEventListener("change", renderAnime);
ratingRange.addEventListener("input", () => {
  ratingValue.textContent = ratingRange.value;
});

addReviewBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addReview();
});

favoriteBtn.addEventListener("click", toggleFavorite);
resetBtn.addEventListener("click", resetForm);

detailsCard.addEventListener("mouseover", () => {
  const anime = getSelectedAnime();
  if (!anime) return;
  hoverStatus.textContent = `Now viewing: ${anime.title}`;
});

// Submit prevention so form never reloads the page.
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

init();

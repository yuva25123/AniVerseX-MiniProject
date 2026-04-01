const sampleAnime = [
  {
    title: "Attack on Titan",
    genre: "Action",
    year: 2013,
    description: "Humanity fights for survival against giant Titans."
  },
  {
    title: "Death Note",
    genre: "Thriller",
    year: 2006,
    description: "A student discovers a notebook with deadly power."
  }
];

function renderAnimeList(animeItems) {
  const $animeList = $("#animeList");
  $animeList.empty();

  animeItems.forEach((anime) => {
    $animeList.append(`
      <article class="card">
        <h3>${anime.title}</h3>
        <p><strong>Genre:</strong> ${anime.genre}</p>
        <p><strong>Year:</strong> ${anime.year}</p>
        <p>${anime.description}</p>
      </article>
    `);
  });
}

$("#loadAnime").on("click", () => {
  $("#status").text("GET request simulated. Anime list loaded.");
  renderAnimeList(sampleAnime);
});

$("#animeForm").on("submit", (event) => {
  event.preventDefault();

  const newAnime = {
    title: $("#title").val(),
    genre: $("#genre").val(),
    year: $("#year").val(),
    description: $("#description").val()
  };

  sampleAnime.push(newAnime);
  $("#status").text("POST request simulated. Anime recommendation added.");
  renderAnimeList(sampleAnime);
  event.target.reset();
});

renderAnimeList(sampleAnime);

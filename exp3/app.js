const apiBaseUrl = "http://localhost:5000/api/anime";

function renderAnimeList(animeItems) {
  const $animeList = $("#animeList");
  $animeList.empty();

  if (!animeItems.length) {
    $animeList.append("<p>No anime recommendations found.</p>");
    return;
  }

  animeItems.forEach((anime) => {
    $animeList.append(`
      <article class="card">
        <h3>${anime.title}</h3>
        <p><strong>Genre:</strong> ${anime.genre}</p>
        <p><strong>Year:</strong> ${anime.year}</p>
        <p><strong>Rating:</strong> ${anime.rating || 0}</p>
        <p>${anime.description}</p>
        <p><strong>Review:</strong> ${anime.review || "No review submitted."}</p>
      </article>
    `);
  });
}

function showStatus(message, isError = false) {
  $("#status")
    .text(message)
    .css("color", isError ? "#ffb4b4" : "#d9ffe4");
}

function loadAnime() {
  showStatus("Loading anime list from Node.js API...");

  $.ajax({
    url: apiBaseUrl,
    method: "GET"
  })
    .done((data) => {
      renderAnimeList(data);
      showStatus("GET request successful. Anime list loaded from backend.");
    })
    .fail((xhr) => {
      const message = xhr.responseJSON?.error || "Could not connect to backend. Start the Node server on port 5000.";
      showStatus(message, true);
    });
}

$("#loadAnime").on("click", loadAnime);

$("#animeForm").on("submit", (event) => {
  event.preventDefault();

  const newAnime = {
    title: $("#title").val(),
    genre: $("#genre").val(),
    year: $("#year").val(),
    rating: $("#rating").val(),
    description: $("#description").val(),
    review: $("#review").val()
  };

  $.ajax({
    url: apiBaseUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(newAnime)
  })
    .done(() => {
      showStatus("POST request successful. Anime recommendation added.");
      event.target.reset();
      loadAnime();
    })
    .fail((xhr) => {
      const message = xhr.responseJSON?.error || "Failed to add anime recommendation.";
      showStatus(message, true);
    });
});

loadAnime();

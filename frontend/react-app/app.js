const { useState } = React;

function App() {
  const [animeList, setAnimeList] = useState([
    { title: "Naruto", genre: "Adventure", rating: 4.5 },
    { title: "Demon Slayer", genre: "Action", rating: 4.7 }
  ]);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    rating: ""
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title || !form.genre || !form.rating) {
      return;
    }

    setAnimeList([
      ...animeList,
      {
        title: form.title,
        genre: form.genre,
        rating: Number(form.rating)
      }
    ]);

    setForm({ title: "", genre: "", rating: "" });
  }

  return (
    <main className="app">
      <section className="hero">
        <h1>AniVerseX React Frontend</h1>
        <p>This module demonstrates React component rendering, form handling, and dynamic list creation.</p>
      </section>

      <section className="grid">
        <article className="card">
          <h2>Add Anime</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Anime title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              name="genre"
              placeholder="Genre"
              value={form.genre}
              onChange={handleChange}
            />
            <input
              name="rating"
              type="number"
              step="0.1"
              placeholder="Rating"
              value={form.rating}
              onChange={handleChange}
            />
            <button type="submit">Add Anime</button>
          </form>
        </article>

        <article className="card">
          <h2>Anime List</h2>
          {animeList.map((anime, index) => (
            <div className="anime-card" key={`${anime.title}-${index}`}>
              <h3>{anime.title}</h3>
              <p><strong>Genre:</strong> {anime.genre}</p>
              <p><strong>Rating:</strong> {anime.rating}</p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

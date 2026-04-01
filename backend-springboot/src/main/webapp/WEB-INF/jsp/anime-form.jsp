<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Add Anime</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 24px; background: #eef2f7; }
        form { width: 520px; max-width: 100%; background: white; padding: 20px; border-radius: 12px; }
        input, textarea { width: 100%; padding: 10px; margin-bottom: 12px; }
        button, a { padding: 10px 16px; display: inline-block; text-decoration: none; }
        .actions { display: flex; gap: 10px; align-items: center; }
    </style>
</head>
<body>
    <h1>${formMode == 'edit' ? 'Edit Anime' : 'Add Anime to AniVerseX'}</h1>
    <form action="/anime" method="post">
        <input type="hidden" name="id" value="${anime.id}" />
        <input type="text" name="title" placeholder="Title" value="${anime.title}" required />
        <input type="text" name="genre" placeholder="Genre" value="${anime.genre}" required />
        <input type="number" name="episodes" placeholder="Episodes" value="${anime.episodes}" required />
        <input type="number" step="0.1" name="rating" placeholder="Rating" value="${anime.rating}" required />
        <textarea name="review" placeholder="Short review" rows="4">${anime.review}</textarea>
        <div class="actions">
            <button type="submit">Save Anime</button>
            <a href="/anime/list">Back to List</a>
        </div>
    </form>
</body>
</html>

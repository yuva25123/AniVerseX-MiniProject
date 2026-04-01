<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Add Anime</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 24px; background: #eef2f7; }
        form { width: 450px; background: white; padding: 20px; border-radius: 12px; }
        input, textarea { width: 100%; padding: 10px; margin-bottom: 12px; }
        button { padding: 10px 16px; }
    </style>
</head>
<body>
    <h1>Add Anime to AniVerseX</h1>
    <form action="/anime" method="post">
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="genre" placeholder="Genre" required />
        <input type="number" name="episodes" placeholder="Episodes" required />
        <input type="number" step="0.1" name="rating" placeholder="Rating" required />
        <textarea name="review" placeholder="Short review" rows="4"></textarea>
        <button type="submit">Save Anime</button>
    </form>
</body>
</html>

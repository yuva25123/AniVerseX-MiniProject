<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>AniVerseX Anime List</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 24px; background: #f8fafc; color: #1f2937; }
        .hero { margin-bottom: 20px; }
        .button { display: inline-block; padding: 10px 14px; border-radius: 8px; background: #2563eb; color: white; text-decoration: none; margin-right: 8px; }
        .button.secondary { background: #475569; }
        table { width: 100%; border-collapse: collapse; background: white; }
        th, td { border: 1px solid #d6dce5; padding: 10px; text-align: left; }
        .actions a { margin-right: 8px; color: #2563eb; text-decoration: none; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>AniVerseX Admin Anime List</h1>
        <p>Spring Boot MVC CRUD module for anime recommendations and reviews.</p>
        <a class="button" href="/anime/new">Add Anime</a>
        <a class="button secondary" href="/anime/list">Refresh List</a>
    </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Episodes</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${animeList}" var="anime">
                <tr>
                    <td>${anime.id}</td>
                    <td>${anime.title}</td>
                    <td>${anime.genre}</td>
                    <td>${anime.episodes}</td>
                    <td>${anime.rating}</td>
                    <td>${anime.review}</td>
                    <td class="actions">
                        <a href="/anime/edit/${anime.id}">Edit</a>
                        <a href="/anime/delete/${anime.id}" onclick="return confirm('Delete this anime?');">Delete</a>
                    </td>
                </tr>
            </c:forEach>
            <c:if test="${empty animeList}">
                <tr>
                    <td colspan="7">No anime records found. Add one to begin the CRUD demo.</td>
                </tr>
            </c:if>
        </tbody>
    </table>
</body>
</html>

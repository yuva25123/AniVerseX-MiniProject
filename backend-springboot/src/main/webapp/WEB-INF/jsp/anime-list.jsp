<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>AniVerseX Anime List</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 24px; background: #f8fafc; }
        table { width: 100%; border-collapse: collapse; background: white; }
        th, td { border: 1px solid #d6dce5; padding: 10px; }
        a { text-decoration: none; }
    </style>
</head>
<body>
    <h1>AniVerseX Admin Anime List</h1>
    <p><a href="/anime/new">Add Anime</a></p>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Episodes</th>
                <th>Rating</th>
                <th>Review</th>
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
                </tr>
            </c:forEach>
        </tbody>
    </table>
</body>
</html>

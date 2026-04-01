CREATE DATABASE IF NOT EXISTS aniversex;
USE aniversex;

CREATE TABLE IF NOT EXISTS anime (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(60) NOT NULL,
    episodes INT NOT NULL,
    rating DOUBLE NOT NULL,
    review VARCHAR(500)
);

INSERT INTO anime (title, genre, episodes, rating, review)
VALUES
    ('Attack on Titan', 'Action', 89, 4.9, 'Dark, emotional, and highly engaging.'),
    ('Naruto', 'Adventure', 220, 4.7, 'A classic long-running shonen series.'),
    ('Death Note', 'Thriller', 37, 4.8, 'Strong suspense and smart character conflict.');
